'use strict';

{
    class Panel {//クラス構文

        // 要素の生成
        constructor () {

            //section要素にpanel要素をつける
            const section = document.createElement('section');//HTML要素を作成
            section.classList.add('panel');

            //その中にimgとstopを追加する
            this.img = document.createElement('img');
            this.img.src = this.getRandomImage();

            this.timeoutId = undefined;

            this.stop = document.createElement('div');
            this.stop.textContent = 'STOP';
            this.stop.classList.add('stop', 'inactive');//stopとinactiveというclassをつける

            this.stop.addEventListener('click', () => {
                //inactiveが付いていたらそれ以降の処理をしない
                if(this.stop.classList.contains('inactive')){
                    return;
                }
                this.stop.classList.add('inactive');

                //止める
                clearTimeout(this.timeoutId);

                //パネルを減らしていく
                panelsLeft--;


                //結果判定
                if(panelsLeft === 0){
                    checkResult();
                    spin.classList.remove('inactive');//結果が出るとinactiveクラスを外してまたspinを押せるようにする
                    panelsLeft = 3;//残機を3に戻す
                }
            });

            section.appendChild(this.img);
            section.appendChild(this.stop);

            const main = document.querySelector('main');
            main.appendChild(section);
        }

        getRandomImage() {
            const images = [
                'img/IMG_0773.JPG',
                'img/IMG_1627.JPG',
                'img/IMG_8935.JPG',
            ];
            return images[Math.floor(Math.random() * images.length)];
        }

        spin() {
            this.img.src = this.getRandomImage();//画像が切り替わる
            this.timeoutId = setTimeout(() => {
                this.spin();
            }, 50);
        }

        //isUnmatchメソッド
        isUnmatched(p1, p2) {
                // if (this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
                //     return true;
                // } else {
                //     return false;

                    return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
                }

                //unmatchedクラスをつけ、CSSで異なる部分を薄くする
                unmatch(){
                    this.img.classList.add('unmatched');
                
        }
        //結果が出た後にpanelをリセットする
        activate(){
            this.img.classList.remove('unmatched');
            this.stop.classList.remove('inactive');
        }
    }

    function checkResult() {//一つづつパネルがマッチしたか判定
        if(panels[0].isUnmatched(panels[1], panels[2],)){
            panels[0].unmatch();
        }
        if(panels[1].isUnmatched(panels[0], panels[2],)){
            panels[1].unmatch();
        }
        if(panels[2].isUnmatched(panels[0], panels[1],)){
            panels[2].unmatch();
        }
    }

    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
    ];

    let panelsLeft = 3;

    const spin = document.getElementById('spin');//spinというIDを取得
    spin.addEventListener('click', () => {
        //spinを押したら色を薄くして何回も押せないようにする
        if(spin.classList.contains('inactive')){//inactiveクラスが付いていたらreturnとし、処理を終了する
            return;
        }

        spin.classList.add('inactive');

        panels.forEach(panel => {
            //panelを再開させるメソッド
            panel.activate();
            //一つ一つの処理をpanelで受けとって次の処理をしなさい
            panel.spin();
        });
    });
}