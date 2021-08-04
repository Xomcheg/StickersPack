"use strict";

document.addEventListener('DOMContentLoaded', function () {


    const stickersParent = document.querySelector('.calculator__stickers'),
        resultParent = document.querySelector('.calculator__result'),
        stickers = document.querySelectorAll('.calculator__stickers-item');
    let resultStickers = document.querySelectorAll('.calculator__result-stick');


    const testParent = document.querySelector('.calculator__result-stickers-test')


    const stickersDB = {
        sticker: []
    };

    testParent.innerHTML = "";



    // for (let i = 0; i < 4; i++) {
    //     stickersDB.sticker += `
    //     <div class="calculator__result-stick "> 
    //         <div class = "calculator__result-del" > 
    //         </div> 
    //     </div>`;
    //     console.log(stickersDB.sticker);
    // }


    for (let i = 0; i < 5; i++) {
        testParent.innerHTML += `
        <div class="calculator__result-stick stick-test"> 
            ${Math.floor(Math.random() * 100)}
            <div class = "calculator__result-del" > 
            </div> 
        </div>`;
        
        // testParent.textContent.sort();
    }
    
   let parentObj = document.querySelectorAll(".stick-test");

    console.log(parentObj.nextSibling);

    parentObj.forEach((item, i) => {
        // console.log(item);
    });


    // function creatParent() {
    //     testParent.forEach((item, i) => {
    //         // i = 0;
    //         if (i < 4) {
    //             testParent.innerHTML += `
    //     <div class="calculator__result-stick ">
    //     ${i}
    //         <div class = "calculator__result-del" > 
            
    //         </div> 
    //     </div>`;

    //         }
    //         // i++;
    //     })

    // }
    // creatParent();












    function removeClass() {
        stickers.forEach((item) => {
            item.classList.remove('stickers-item--active');
        });
    }


    function checkPack() {
        let pack = document.querySelectorAll('.calculator__result-stickers img'),
            resultButtons = document.querySelectorAll('.calculator__result-buttons');
        if (pack.length >= 5) {
            resultButtons[0].style.display = 'block';
        } else {
            resultButtons[0].style.display = 'none';
        }
        if (pack.length >= 10) {
            resultButtons[1].style.display = 'block';
        } else {
            resultButtons[1].style.display = 'none';
        }
        if (pack.length >= 15) {
            resultButtons[2].style.display = 'block';
        } else {
            resultButtons[2].style.display = 'none';
        }
    }

    let i = 0;
    stickersParent.addEventListener('click', (event) => {
        let target = event.target;
        const parentItem = target.parentNode.parentNode;
        removeClass();
        if (target.classList.contains('calculator__main-img')) {
            parentItem.classList.add('stickers-item--active');
        }
        if (target.classList.contains('calculator__color-img')) {
            let colorItem = target.cloneNode(true);
            resultStickers[i].prepend(colorItem);
            resultStickers[i].classList.add('result-stick--active');

            i++;
            checkPack();
        }
    });


    resultParent.addEventListener('click', (event) => {
        let target = event.target;

        if (target.previousElementSibling.classList.contains('calculator__color-img')) {
            target.previousElementSibling.remove();
            target.parentNode.classList.remove('result-stick--active');
        }
    });





});