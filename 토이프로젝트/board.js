"use strict"
const list = [];
let no = 0;
const prompt = require('prompt-sync')();
const quit = () => {
    console.log("게시판 프로그램을 종료합니다.");
    process.exit();
}
const selectBoardByNo = index => list.find(item => item.no === index);
const selectIndexByNo = index => list.findIndex(item => item.no === index);
const listBoard = () => {
    console.log("전체 " + list.length + "개");
    console.log("------------------");
    console.log("번호\t글쓴이\t제목");
    console.log("-----------------------");
    if (list.length != 0) {
        list.forEach( item => {
            console.log(`${item.no}`\t)
        })
    }

}