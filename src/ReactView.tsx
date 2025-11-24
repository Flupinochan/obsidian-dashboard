import type { App } from "obsidian";
import { useEffect, useState } from "react";
import { CharCountChart } from "./components/CharCountChart";
import { FileCountChart } from "./components/FileCountChart";
import { FileSizeChart } from "./components/FileSizeChart";
import { FolderSizeChart } from "./components/FolderSizeChart";
import { TagChart } from "./components/TagChart";

const getMonthKey = (timestamp: number): string => {
  const date = new Date(timestamp);
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}/${month}`;
};

export const ReactView = ({ app }: { app: App }) => {
  const [charCountData, setCharCountData] = useState<
    { month: string; monthly: number; cumulative: number }[]
  >([]);

  // vault内の全Markdownファイル取得
  const files = app.vault.getMarkdownFiles();

  // 月別ファイル作成数・ファイルサイズ集計
  const monthlyData: Record<string, { count: number; size: number }> = {};
  files.forEach((file) => {
    const key = getMonthKey(file.stat.ctime);
    if (!monthlyData[key]) {
      monthlyData[key] = { count: 0, size: 0 };
    }
    monthlyData[key].count += 1;
    monthlyData[key].size += file.stat.size;
  });
  const sortedEntries = Object.entries(monthlyData).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  // 1. ファイル作成数：月別 + 累積
  let cumCount = 0;
  const fileCountData = sortedEntries.map(([month, { count }]) => {
    cumCount += count;
    return {
      month,
      monthly: count,
      cumulative: cumCount,
    };
  });

  // 2. ファイルサイズ：月別 + 累積
  let cumSize = 0;
  const fileSizeData = sortedEntries.map(([month, { size }]) => {
    cumSize += size;
    return {
      month,
      monthly: Math.round(size / 1024),
      cumulative: Math.round(cumSize / 1024),
    };
  });

  // 3. タグ集計
  const tagCount: Record<string, number> = {};
  files.forEach((file) => {
    const cache = app.metadataCache.getFileCache(file);
    const tags = cache?.tags ?? [];
    tags.forEach((t) => {
      tagCount[t.tag] = (tagCount[t.tag] || 0) + 1;
    });
  });
  const tagData = Object.entries(tagCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }));

  // 4. 文字数集計
  useEffect(() => {
    const loadData = async () => {
      const fileData = await Promise.all(
        files.map(async (file) => {
          const content = await app.vault.read(file);
          return {
            chars: content.length,
            ctime: file.stat.ctime,
          };
        }),
      );

      // 月別文字数集計
      const monthlyChars: Record<string, number> = {};
      fileData.forEach((file) => {
        const key = getMonthKey(file.ctime);
        monthlyChars[key] = (monthlyChars[key] || 0) + file.chars;
      });

      let cumChars = 0;
      const charData = Object.entries(monthlyChars)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, chars]) => {
          cumChars += chars;
          return {
            month,
            monthly: chars,
            cumulative: cumChars,
          };
        });

      setCharCountData(charData);
    };
    loadData();
  }, [app, files]);

  // 5. フォルダサイズ集計
  const folderSize: Record<string, number> = {};
  files.forEach((file) => {
    const folder = file.parent?.path || "root";
    folderSize[folder] = (folderSize[folder] || 0) + file.stat.size;
  });
  const treeMapData = Object.entries(folderSize)
    .map(([fullPath, size]) => ({
      fullPath,
      name: fullPath.split("/").pop() || fullPath,
      size: Math.round(size / 1024),
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 20);

  return (
    <div>
      <FileCountChart data={fileCountData} />
      <FileSizeChart data={fileSizeData} />
      <CharCountChart data={charCountData} />
      <TagChart data={tagData} />
      <FolderSizeChart data={treeMapData} />
    </div>
  );
};
