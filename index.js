// 사진 수정
// ui 손좀 더보기
// ending페이지 기능추가 및 손보기


import data from "./data.js";



const StartButton = document.querySelector('#StartButton');
const RoundSelect = document.querySelector('#RoundSelect');
const StartForm = document.querySelector('.StartForm');
const InGame = document.querySelector('.InGame');
const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const title1 = document.querySelector('#title1');
const title2 = document.querySelector('#title2');
const WorldCupTitle = document.querySelector('#WorldCupTitle');
const InGameEnding = document.querySelector('.InGameEnding');
const WinnerImg = document.querySelector('.WinnerImg');
const WinnerTitle = document.querySelector('#WinnerTitle');

let Winner = {};
let round = 0;
let options = [];
let NextRound = [];
let CurRound = 0;
let CanClick = true;


StartButton.addEventListener('click', (e) => {
    round = RoundSelect.value;
    StartForm.classList.add('hidden');
    InGame.classList.remove('hidden');
    let ShuffledData = Shuffle(data);

    for (let i = 0; i < round; i++) {
        options.push(ShuffledData[i])
    }
    ChangeImage();
})

img1.addEventListener('click', () => {
    SelectOption(0);
})

img2.addEventListener('click', () => {
    SelectOption(1);
})

function Shuffle(array) {
    let copy = [...array]
    copy.sort(() => {
        return Math.random() - 0.5;
    });
    return copy;
}

function ChangeImage() {
    img1.style.backgroundImage = `url(${options[CurRound * 2].image})`;
    img2.style.backgroundImage = `url(${options[CurRound * 2 + 1].image})`;
    title1.innerHTML = options[CurRound * 2].name;
    title2.innerHTML = options[CurRound * 2 + 1].name;
    WorldCupTitle.innerHTML = `제1회 복소수 이모티콘 섹시이상형 월드컵 ${round == 2 ? `결승전` : `${round}강`} ${round == 2 ? '' : `(${CurRound}/${round / 2})`}`
}

function SelectOption(num) {
    if (CanClick)
    {
        CanClick = false;
        NextRound.push(options[CurRound * 2 + num]);

        if (num == 0) {
            img1.classList.add('Selected');
            img2.classList.add('hidden');
        }
        else {
            img2.classList.add('Selected');
            img1.classList.add('hidden');
        }

        setTimeout(() => {
            if (CurRound < round / 2 - 1) {
                CurRound++;
                ChangeImage();
            }
            else if (round == 2) {
                Winner = options[CurRound * 2 + num];
                InGame.classList.add('hidden');
                InGameEnding.classList.remove('hidden');
                WinnerImg.style.backgroundImage = `url(${Winner.image})`;
                WinnerTitle.innerHTML = Winner.name;
                WorldCupTitle.innerHTML = '제1회 복소수 이모티콘 섹시이상형 월드컵'
            }
            else {
                CurRound = 0;
                round /= 2;
                options = Shuffle([...NextRound]);
                NextRound = [];
                ChangeImage();
            }

            img1.classList.remove('Selected');
            img2.classList.remove('hidden');
            img2.classList.remove('Selected');
            img1.classList.remove('hidden');

            CanClick = true;
        }, 1000);


    }


}
