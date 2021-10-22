"use strict";

document.addEventListener('DOMContentLoaded', function () {
    const stickersParent = document.querySelector('.calculator__stickers'),
        resultParent = document.querySelector('.calculator__result'),
        calculatorMainImg = document.querySelectorAll('.calculator__main-img'),
        stickers = document.querySelectorAll('.calculator__stickers-item');
    let resultStickers = document.querySelectorAll('.calculator__result-stick');
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
            calculatorMainImg.forEach(item => {
                let blockItem = document.createElement('div');
                blockItem.classList.add('block-stick');
                blockItem.innerHTML = `
                <img src="images/stickers/stick-block-wasted-img.png" alt="">
                `;
                item.parentNode.parentNode.prepend(blockItem);
                item.style.pointerEvents = 'none';
                item.parentNode.style.opacity = '0.3';
            });
        } else {
            resultButtons[2].style.display = 'none';
            calculatorMainImg.forEach(item => {
                item.style.pointerEvents = 'auto';
                item.style.opacity = '1';
                // item.parentNode.parentNode.firstChild.remove();
            });
        }
    }
    let i = 0;
    let arrSticks = [];
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
            arrSticks[i] = colorItem;
            resultStickers[i].classList.add('result-stick--active');
            i++;
            checkPack();
        }
    });
    resultParent.addEventListener('click', (event) => {
        let target = event.target;
        if (target.classList.contains('calculator__result-del')) {
            let delStick = arrSticks.indexOf(target.previousElementSibling);
            for (let i = 0; i < resultStickers.length; i++) {
                let elem = resultStickers[i].children;
                for (let i = 0; i < elem.length; i++) {
                    if (elem[i].classList.contains('calculator__color-img')) {
                        elem[i].remove();
                        elem[i].parentNode.classList.remove('result-stick--active');
                    }
                }
            }
            arrSticks.splice(delStick, 1);
            for (let i = 0, j = arrSticks.length; i < j; i++) {
                resultStickers[i].prepend(arrSticks[i]);
                resultStickers[i].classList.add('result-stick--active');
            }
            i = arrSticks.length;
            checkPack();
        }

        let item;

        if (target.classList.contains('calculator__result-cleaning')) {
            item = target.parentNode.parentNode.previousElementSibling;
        } else if (target.classList.contains('calculator__result-cleaning-img')) {
            item = target.parentNode.parentNode.parentNode.previousElementSibling;
            console.log(item);
        }
        let elem = item.children;
        for (let i = 0; i < elem.length; i++) {
            let items = elem[i].children;
            elem[i].classList.remove('result-stick--active');
            items[0].remove();
        }
        if (item.classList.contains('first__pack')) {
            arrSticks.splice(0, 5);
        } else if (item.classList.contains('second__pack')) {
            arrSticks.splice(5, 5);
        } else if (item.classList.contains('third__pack')) {
            arrSticks.splice(10, 5);
        }

        for (let i = 0, j = arrSticks.length; i < j; i++) {
            resultStickers[i].prepend(arrSticks[i]);
            resultStickers[i].classList.add('result-stick--active');
        }

        for (let i = arrSticks.length; i < resultStickers.length; i++) {
            resultStickers[i].classList.remove('result-stick--active');
        }

        i = arrSticks.length;

        checkPack();
        // if (target.classList.contains('calculator__result-cleaning')) {
        //     if (target.classList.contains('calculator__result-cleaning-img')){
        //         // let item
        //     }
        //     item = target.parentNode.parentNode.previousElementSibling;
        //     let elem = item.children;
        //     console.log(elem);
        //     for (let i = 0; i < elem.length; i++) {
        //         let items = elem[i].children;
        //         elem[i].classList.remove('result-stick--active');
        //         items[0].remove();
        //     }
        //     if (item.classList.contains('first__pack')) {
        //         arrSticks.splice(0, 5);
        //     } else if(item.classList.contains('second__pack')){
        //         arrSticks.splice(5, 5);
        //     } else if(item.classList.contains('third__pack')){
        //         arrSticks.splice(10, 5);
        //     }

        //     for (let i = 0, j = arrSticks.length; i < j; i++) {
        //         resultStickers[i].prepend(arrSticks[i]);
        //         resultStickers[i].classList.add('result-stick--active');
        //     }

        //     for (let i = arrSticks.length; i < resultStickers.length; i ++) {
        //         resultStickers[i].classList.remove('result-stick--active');
        //     }
        //     i = arrSticks.length;

        //     checkPack();
        // }
    });






    //--------------------------------------------------------------------------
    //START-----------------MESSANGERS------------------------------------------
    //--------------------------------------------------------------------------

    let messangers = document.querySelector('.messangers');

    // messangers.addEventListener('click', function(e){
    //     let target = e.target;
    //     if (target.classList.contains('messangers__main')){
    //         messangers.classList.add('messangers--active');
    //     } else {
    //         removeMessangers();
    //     }
    // });

    messangers.addEventListener('click', function() {
        this.classList.add('messangers--active')
    })
    function removeMessangers() {
        messangers.classList.remove('messangers--active');
    }
    // messangers.addEventListener('mouseout', function(){
    //     messangers.classList.remove('messangers--active');
    // })


    //--------------------------------------------------------------------------
    //END-------------------MESSANGERS------------------------------------------
    //--------------------------------------------------------------------------
   
    // document.querySelector('body').addEventListener('click', function(e){
        
    //     let target = e.target;
    //     if (!target.classList.contains('messangers--active')) {
    //         console.log(target);
    //         messangers.classList.remove('messangers--active');
    //     }
    // });


});