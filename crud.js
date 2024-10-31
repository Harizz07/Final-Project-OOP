const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnDelete = document.getElementById('btnDelete');
var btnUpdate = document.getElementById('btnUpdate');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');
var fileTable = document.getElementById('fileTable').getElementsByTagName('tbody')[0];

let pathName = path.join(__dirname, 'Files');

function loadFiles() {
    fs.readdir(pathName, (err, files) => {
        if (err) {
            return console.log(err);
        }
        fileTable.innerHTML = ''; 
        files.forEach(file => {
            if (file.endsWith('.txt')) {
                let row = fileTable.insertRow();
                let cellFileName = row.insertCell(0);
                let cellAction = row.insertCell(1);
                cellFileName.textContent = file;
                cellFileName.style.cursor = 'pointer'; 
                cellFileName.onclick = () => {
                    fileName.value = file;
                    readFile(file);
                };
                cellAction.innerHTML = '<button class="btn btn-default" onclick="deleteFile(\'' + file + '\')">Delete</button>';
            }
        });
    });
}

function readFile(file) {
    let filepath = path.join(pathName, file);
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        fileContents.value = data;
        console.log("The file was read");
    });
}

function deleteFile(file) {
    let filepath = path.join(pathName, file);
    fs.unlink(filepath, (err) => {
        if (err) {
            return console.log(err);
        }
        alert(file + " file was deleted");
        loadFiles(); 
    });
}

btnCreate.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function(err) {
        if (err) {
            return console.log(err);
        }
        alert(fileName.value + " file was created");
        fileName.value = "";
        fileContents.value = "";
        loadFiles(); 
    });
});

btnRead.addEventListener('click', function(){
    readFile(fileName.value);
});

btnUpdate.addEventListener('click', function(){
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function(err) {
        if (err) {
            return console.log(err);
        }
        alert(fileName.value + " file was updated");
        fileName.value = "";
        fileContents.value = "";
        loadFiles(); 
    });
});

loadFiles();
