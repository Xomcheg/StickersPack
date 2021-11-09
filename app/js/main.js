"use strict";

document.addEventListener('DOMContentLoaded', function () {




    //--------------------------------------------------------------------------
    //START--------------------HEADER SLIDER------------------------------------
    //--------------------------------------------------------------------------

    const sliderBoxPoint = document.querySelectorAll('.slider-box__point');

    sliderBoxPoint.forEach(function (item) {
        item.addEventListener('click', function () {
            if (item.parentNode.classList.contains('item-point--active')) {
                console.log('verno');
                item.parentNode.classList.remove('item-point--active');
            } else {
                item.parentNode.classList.add('item-point--active');
            }


        });
    });


    //--------------------------------------------------------------------------
    //END----------------------HEADER SLIDER------------------------------------
    //--------------------------------------------------------------------------





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
            for (let i = 0; i < calculatorMainImg.length; i++) {


                let elemParent = calculatorMainImg[i].parentNode.parentNode.children;
                for (let i = 0; i < elemParent.length; i++) {
                    if (elemParent[i].classList.contains('block-stick')) {
                        console.log(elemParent[i]);
                        elemParent[i].remove();
                    }
                }

                calculatorMainImg[i].style.pointerEvents = 'auto';
                calculatorMainImg[i].parentNode.style.opacity = '1';
            }
        }
    }

    // function clearStick() {

    //     for(let i = 0; i < stickers.length; i++) {
    //         let  = stickers[i].children;

    //         console.log(itemParent);
    //         for (let i = 0; i < itemParent.length; i++){
    //             if (itemParent[i].classList.contains('block-stick')){
    //                 console.log(itemParent[i]);
    //                 // itemParent[i].remove();
    //             }
    //         }
    //     }

    // }

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
            removeStick(item);
        } else if (target.classList.contains('calculator__result-cleaning-img')) {
            item = target.parentNode.parentNode.parentNode.previousElementSibling;
            removeStick(item);
        }
        checkPack();

        function removeStick(item) {
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
        }

    });




    //--------------------------------------------------------------------------
    //START--------------------BOX----------------------------------------------
    //--------------------------------------------------------------------------

    let box = document.querySelector('.box'),
        boxMain = document.querySelector('.box__main'),
        boxMainImg = document.querySelector('.box__main-img');

    boxMain.addEventListener('click', function (e) {
        let target = e.target;
        console.log(target);
        if (target.classList.contains('box__main--active')) {
            target.classList.remove('box__main--active');
            boxMain.classList.remove('box__main--active');
            boxMainImg.classList.remove('box__main--active');
            box.classList.remove('box--active');
            animateItems();
        } else if (target.classList.contains('box__main-img')) {
            target.classList.add('box__main--active');
            boxMain.classList.add('box__main--active');
            box.classList.add('box--active');
        } else {
            boxMainImg.classList.add('box__main--active');
            boxMain.classList.add('box__main--active');
            box.classList.add('box--active');
        }


    });


    // let  = setInterval(function(){
    //     console.log('verno');
    // },1000);




    function animateItems() {
        console.log('verno');
    }
    //--------------------------------------------------------------------------
    //END----------------------BOX----------------------------------------------
    //--------------------------------------------------------------------------

 
});

    // $('.header__slider').slick({
    //     slidesToShow: 1,
    //     slideToScroll: 1,
    // });
  
   
    $(function(){
        $('.header__slider').slick({

        });
    });
