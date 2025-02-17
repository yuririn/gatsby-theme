const fs = require('fs');
const path = require('path');

exports.onPostBuild = () => {
    const nodeEnv = process.env.NODE_ENV || 'production';
    const branchName = process.env.BRANCH || 'unknown-branch'; // BRANCH環境変数を取得

    // 環境を確認
    console.log('Node Environment:', nodeEnv);
    console.log('Branch Name:', branchName); // デバッグ用ログ

    if (nodeEnv === 'development') {
        const basicAuthId = process.env.BASIC_AUTH_ID || '';
        const basicAuthPass = process.env.BASIC_AUTH_PASS || '';

        // デバッグ用ログ
        console.log('Basic Auth ID:', basicAuthId);
        console.log('Basic Auth Pass:', basicAuthPass);

        const headersPath = path.join('/opt/build/repo/public/', '_headers');
        console.log('Headers Path:', headersPath); // デバッグ用

        const basicAuthHeader = '/*\nBasic-Auth: ' + basicAuthId + ':' + basicAuthPass + '\n*/\n';
        const branchHeader = '/*\nBranch: ' + branchName + '\n*/\n'; // ブランチ名をヘッダに追加

        // `_headers` ファイルの内容を全て削除し、Basic認証とブランチ名のみを追加
        const headersContent = basicAuthHeader + branchHeader;

        try {
            if (fs.existsSync(headersPath)) {
                // ファイルが存在する場合、上書き
                fs.writeFileSync(headersPath, headersContent, 'utf8');
                console.log('Headers file updated');
            } else {
                // ファイルが存在しない場合、新規作成
                fs.mkdirSync(path.dirname(headersPath), { recursive: true });
                fs.writeFileSync(headersPath, headersContent, 'utf8');
                console.log('Created new headers file');
            }
            console.log('Headers content:', headersContent); // デバッグ用

            // 開発環境でのrobots.txt設定
            const robotsPath = path.join('/opt/build/repo/public/', 'robots.txt');
            const robotsContent = 'User-agent: *\nDisallow: /\n';

            if (fs.existsSync(robotsPath)) {
                // ファイルが存在する場合、上書き
                fs.writeFileSync(robotsPath, robotsContent, 'utf8');
                console.log('robots.txt file updated');
            } else {
                // ファイルが存在しない場合、新規作成
                fs.mkdirSync(path.dirname(robotsPath), { recursive: true });
                fs.writeFileSync(robotsPath, robotsContent, 'utf8');
                console.log('Created new robots.txt file');
            }
            // デバッグ用にrobots.txtの内容を出力
            const robotsFileContent = fs.readFileSync(robotsPath, 'utf8');
            console.log('Robots content:', robotsFileContent); // デバッグ用
        } catch (error) {
            console.error('Error handling headers or robots file:', error);
        }
    }
};
