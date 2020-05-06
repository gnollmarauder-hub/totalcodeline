// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { workspace as ws } from 'vscode';
const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
/**
 * 获取当前所在工程根目录，有3种使用方法：<br>
 * getProjectPath(uri) uri 表示工程内某个文件的路径<br>
 * getProjectPath(document) document 表示当前被打开的文件document对象<br>
 * getProjectPath() 会自动从 activeTextEditor 拿document对象，如果没有拿到则报错
 * @param {*} document 
 */
let rootPath = vscode.workspace.rootPath

debugger
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "totalcodeline" is now active!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('totalcodeline.helloWorld', async () => {
		// The code you place here will be executed every time your command is executed
    
		// Display a message box to the user
		vscode.window.showInformationMessage(rootPath || '获取路径错误');
		let a = await exec('git config user.name', { cwd: rootPath }, (err: any, stdout:any, stderr: any) => {
			const codeStatisCmd = `git log --author=${stdout} --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -`
			if (!err) {
				exec(codeStatisCmd, (err:any, stdout:any,stderr: any) => {
					console.log(stdout, 'abc')
				})
			}
		})
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}


