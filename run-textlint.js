#!/usr/bin/env node
const { exec } = require('child_process');
const path = require('path');

// コマンドライン引数からファイルパスを取得
const relativeFilePath = process.argv[2];

if (!relativeFilePath) {
    console.error('Error: ファイルパスを指定してください。');
    process.exit(1);
}

// ファイルパスを絶対パスに変換
const filePath = path.resolve(process.cwd(), relativeFilePath);

console.log(`Received file path: ${filePath}`);

// ルールディレクトリのパス
const rulesDir = path.resolve(__dirname, './original-textlint-rules');

console.log(`Using rules directory: ${rulesDir}`);

// textlint を実行する関数
const runTextlint = (filePath) => {
    exec(`npx textlint --rulesdir "${rulesDir}" "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Exec error: ${error}`);
            console.error(`stderr: ${stderr}`);
            console.log(`stdout: ${stdout}`);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
        }
        if (stdout) {
            console.log(`Output: ${stdout}`);
        }
    });
};

// textlint の実行
runTextlint(filePath);
