const fs = require('fs');
const path = require('path');

console.log('postBuild script start');

// `NODE_ENV`の値をログに出力
const nodeEnv = process.env.NODE_ENV || 'production';
console.log(`Current NODE_ENV: ${nodeEnv}`);

if (nodeEnv === 'development') {
    console.log('Environment is development');
    const headersPath = path.join(__dirname, '../public', '_headers');
    const basicAuthId = process.env.BASIC_AUTH_ID || '';
    const basicAuthPass = process.env.BASIC_AUTH_PASS || '';

    // `_headers`ファイルが存在しない場合は作成
    if (!fs.existsSync(headersPath)) {
        fs.writeFileSync(headersPath, '', 'utf8');
        console.log(`Created ${headersPath}`);
    }

    if (basicAuthId && basicAuthPass) {
        const basicAuthHeader = `/*
    Basic-Auth: ${basicAuthId}:${basicAuthPass}\n`;

        // 現在の_headersファイルの内容を読み込み
        let headersContent = fs.readFileSync(headersPath, 'utf8');

        // Basic-Authヘッダーを先頭に追加
        headersContent = basicAuthHeader + headersContent;

        // 修正された内容を書き戻す
        fs.writeFileSync(headersPath, headersContent, 'utf8');
        console.log('Headers file updated');
    } else {
        console.log('BASIC_AUTH_ID or BASIC_AUTH_PASS is not defined.');
    }
} else {
    console.log('This code is not running in development mode.');
}
console.log('postBuild script end');
