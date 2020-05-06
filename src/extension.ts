// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { workspace as ws } from 'vscode';
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * 获取当前所在工程根目录，有3种使用方法：<br>
 * getProjectPath(uri) uri 表示工程内某个文件的路径<br>
 * getProjectPath(document) document 表示当前被打开的文件document对象<br>
 * getProjectPath() 会自动从 activeTextEditor 拿document对象，如果没有拿到则报错
 * @param {*} document 
 */
const ad = getProjectPath(null)
function getProjectPath(document: any) {
	debugger
	if (!document) {
			document = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document : null;
	}
	if (!document) {
			vscode.window.showErrorMessage('当前激活的编辑器不是文件或者没有文件被打开！');
			return '';
	}
	const currentFile = (document.uri ? document.uri : document).fsPath;
	let projectPath = null;
	let abc = ws.workspaceFolders
  if (!abc) {
		abc = []
	}
	let workspaceFolders = abc.map(item => item.uri.path);
	// 由于存在Multi-root工作区，暂时没有特别好的判断方法，先这样粗暴判断
	// 如果发现只有一个根文件夹，读取其子文件夹作为 workspaceFolders
	if (workspaceFolders.length == 1 && workspaceFolders[0] === vscode.workspace.rootPath) {
			const rootPath = workspaceFolders[0];
			var files = fs.readdirSync(rootPath);
			workspaceFolders = files.filter((name:any) => !/^\./g.test(name)).map((name: any) => path.resolve(rootPath, name));
			// vscode.workspace.rootPath会不准确，且已过时
			// return vscode.workspace.rootPath + '/' + this._getProjectName(vscode, document);
	}
	workspaceFolders.forEach(folder => {
			if (currentFile.indexOf(folder) === 0) {
					projectPath = folder;
			}
	})
	if (!projectPath) {
			vscode.window.showErrorMessage('获取工程根路径异常！');
			return '';
	}
	projectPath = path.resolve(projectPath, '../')
	return projectPath;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "totalcodeline" is now active!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('totalcodeline.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
    
		// Display a message box to the user
		vscode.window.showInformationMessage(ad);
		exec('git config user.name', { cwd: ad }, (data: Object) => {
			console.log(data, 'acb')
			debugger
		})
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}


