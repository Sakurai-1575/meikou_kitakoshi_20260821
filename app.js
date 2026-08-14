"use strict";

const questions = [
    {
        era: "古代〜中世",
        theme: "土地と政治の変化",
        hint: "「だれの土地になったか」に着目！",

        image: "images/tomitasyo.jpg",

        explanation:
            "国が土地を管理する仕組みから、土地の私有が認められ、荘園が広がりました。その土地を守るために武士が力を持つようになり、政治の主役が変化していきました。",
        cards: [
            {
                id: "q1-1",
                title: "大化の改新",
                caption: "公地公民。土地と人々を国が管理する方向へ。"
            },
            {
                id: "q1-2",
                title: "墾田永年私財法",
                caption: "新しく開墾した土地の私有が認められる。"
            },
            {
                id: "q1-3",
                title: "荘園の発生",
                caption: "私有地が広がり、有力者の土地が増える。"
            },
            {
                id: "q1-4",
                title: "武士の台頭",
                caption: "土地を守るため、武力を持つ者が力を伸ばす。"
            }
        ],
        answer: ["q1-1", "q1-2", "q1-3", "q1-4"]
    },
    {
        era: "江戸〜幕末",
        theme: "外圧と倒幕の流れ",
        hint: "「外からの圧力」が幕府をどう追い詰めたか！",

        image: "images/Taisei_Hokan.jpg",

        explanation:
            "長く続いた鎖国体制は、ペリー来航によって大きく揺らぎました。開国後、幕府への不満が高まり、尊王攘夷運動から倒幕へと流れがつながりました。",
        cards: [
            {
                id: "q2-1",
                title: "鎖国体制の確立",
                caption: "外国との交流を大きく制限する体制が続く。"
            },
            {
                id: "q2-2",
                title: "ペリー来航と開国",
                caption: "外圧によって日本は開国を迫られる。"
            },
            {
                id: "q2-3",
                title: "尊王攘夷運動の高まり",
                caption: "幕府への不満と外国排除の主張が強まる。"
            },
            {
                id: "q2-4",
                title: "大政奉還",
                caption: "徳川慶喜が政権を朝廷に返す。"
            }
        ],
        answer: ["q2-1", "q2-2", "q2-3", "q2-4"]
    },

    {
        era: "明治",
        theme: "近代国家への改革と民主主義",
        hint: "国を固め、お金を集め、国民の声に応える順番！",

        image: "images/dainipponteikokukenpou1.jpg",

        explanation:

            "明治政府は廃藩置県で国を一つにまとめ、地租改正で安定した収入を得ました。その後、国会開設を求める自由民権運動が高まり、憲法発布へと進みました。",
        cards: [
            {
                id: "q3-1",
                title: "廃藩置県",
                caption: "藩を廃止し、中央政府が全国を直接支配する。"
            },
            {
                id: "q3-2",
                title: "地租改正",
                caption: "土地に税をかけ、政府の安定収入を確保する。"
            },
            {
                id: "q3-3",
                title: "自由民権運動",
                caption: "国会開設や政治参加を求める運動が広がる。"
            },
            {
                id: "q3-4",
                title: "大日本帝国憲法発布",
                caption: "近代国家としての政治の仕組みが整えられる。"
            }
        ],
        answer: ["q3-1", "q3-2", "q3-3", "q3-4"]
    },
    {
        era: "昭和",
        theme: "世界恐慌から戦争への連鎖",
        hint: "経済の行き詰まりがどう戦争につながったか！",

        image: "images/taiheiyousensou.jpg",

        explanation:
            "世界恐慌で経済が悪化すると、日本は満州へ進出しました。その後、日中戦争が長期化し、国際的に孤立する中で資源不足に追い詰められ、太平洋戦争へ進みました。",
        cards: [
            {
                id: "q4-1",
                title: "世界恐慌",
                caption: "世界的な不景気が日本経済にも大きな打撃を与える。"
            },
            {
                id: "q4-2",
                title: "満州事変",
                caption: "日本が満州へ軍事的に進出する。"
            },
            {
                id: "q4-3",
                title: "日中戦争の泥沼化",
                caption: "中国との戦争が長期化していく。"
            },
            {
                id: "q4-4",
                title: "太平洋戦争開戦",
                caption: "資源不足と国際的孤立の中で戦争へ突入する。"
            }
        ],
        answer: ["q4-1", "q4-2", "q4-3", "q4-4"]
    }
];

let currentQuestionIndex = 0;
let sortableInstance = null;

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("start-form").addEventListener("submit", handleStart);
    document.getElementById("hint-button").addEventListener("click", openHintModal);
    document.getElementById("close-hint-button").addEventListener("click", closeHintModal);
    document.getElementById("judge-button").addEventListener("click", judgeAnswer);
    document.getElementById("retry-button").addEventListener("click", closeResultModal);
    document.getElementById("next-button").addEventListener("click", goToNextQuestion);
    document.getElementById("restart-button").addEventListener("click", restartApp);

    document.getElementById("result-modal").addEventListener("click", closeModalByBackdrop);
    document.getElementById("hint-modal").addEventListener("click", closeModalByBackdrop);
}

function handleStart(event) {
    event.preventDefault();

    const input = document.getElementById("team-name");
    const teamName = input.value.trim() || "名無しチーム";

    document.getElementById("team-display").textContent = teamName;

    currentQuestionIndex = 0;
    showScreen("work-screen");
    renderQuestion();
}

function showScreen(screenId) {
    document.getElementById("start-screen").classList.remove("screen-active");
    document.getElementById("work-screen").classList.remove("screen-active");
    document.getElementById("complete-screen").classList.remove("screen-active");

    document.getElementById(screenId).classList.add("screen-active");
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];

    document.getElementById("question-progress").textContent =
        String(currentQuestionIndex + 1) + " / " + String(questions.length);

    document.getElementById("era-label").textContent = question.era;
    document.getElementById("theme-title").textContent = question.theme;
    document.getElementById("hint-text").textContent = question.hint;

    const list = document.getElementById("sortable-cards");
    list.innerHTML = "";

    const shuffledCards = shuffleArray(question.cards.slice());

    shuffledCards.forEach(function (card, index) {
        const li = document.createElement("li");
        li.className = "event-card";
        li.dataset.id = card.id;

        const order = document.createElement("span");
        order.className = "event-card-order";
        order.textContent = String(index + 1);

        const textBox = document.createElement("div");

        const title = document.createElement("p");
        title.className = "event-card-title";
        title.textContent = card.title;

        const caption = document.createElement("p");
        caption.className = "event-card-caption";
        caption.textContent = card.caption;

        textBox.appendChild(title);
        textBox.appendChild(caption);
        li.appendChild(order);
        li.appendChild(textBox);

        list.appendChild(li);
    });

    setupSortable();
}

function setupSortable() {
    const list = document.getElementById("sortable-cards");

    if (sortableInstance !== null) {
        sortableInstance.destroy();
    }

    if (typeof Sortable === "undefined") {
        alert("SortableJSが読み込めていません。インターネット接続またはHTMLのscriptタグを確認してください。");
        return;
    }

    sortableInstance = new Sortable(list, {
        animation: 220,
        ghostClass: "sortable-ghost",
        forceFallback: true,
        onEnd: updateCardNumbers
    });
}

function updateCardNumbers() {
    const cards = document.querySelectorAll(".event-card");

    cards.forEach(function (card, index) {
        const order = card.querySelector(".event-card-order");
        order.textContent = String(index + 1);
    });
}

function judgeAnswer() {
    const question = questions[currentQuestionIndex];
    const cards = document.querySelectorAll(".event-card");

    const currentOrder = Array.from(cards).map(function (card) {
        return card.dataset.id;
    });

    const isCorrect = currentOrder.every(function (id, index) {
        return id === question.answer[index];
    });

    if (isCorrect) {
        showCorrectResult(question);
    } else {
        showWrongResult();
    }
}

function showCorrectResult(question) {

    const modal = document.getElementById("result-modal");

    modal.classList.remove("is-wrong");
    modal.classList.add("is-correct");

    document.getElementById("result-icon").textContent = "✓";

    document.getElementById("result-title").textContent =
        "見事！歴史の因果関係を解明！";

    document.getElementById("result-message").textContent =
        "正しい順番です。流れをつかめています。";

    document.getElementById("explanation-text").textContent =
        question.explanation;

    const image = document.getElementById("explanation-image");

    if (question.image) {
        image.src = question.image;
        image.style.display = "block";
    } else {
        image.style.display = "none";
    }

    openResultModal();
    launchConfetti();
}

function showWrongResult() {
    const modal = document.getElementById("result-modal");

    modal.classList.remove("is-correct");
    modal.classList.add("is-wrong");

    document.getElementById("result-icon").textContent = "!";
    document.getElementById("result-title").textContent = "惜しい！順番がちがうぞ";
    document.getElementById("result-message").textContent =
        "どこかの因果関係が入れ替わっています。教科書をもう一度チェックして、再調査しましょう。";

    openResultModal();
}

function goToNextQuestion() {
    closeResultModal();

    currentQuestionIndex += 1;

    if (currentQuestionIndex >= questions.length) {
        showScreen("complete-screen");
        launchConfetti();
        return;
    }

    renderQuestion();
}

function restartApp() {
    currentQuestionIndex = 0;

    document.getElementById("team-name").value = "";
    document.getElementById("team-display").textContent = "未設定";

    showScreen("start-screen");
}

function openResultModal() {
    const modal = document.getElementById("result-modal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
}

function closeResultModal() {
    const modal = document.getElementById("result-modal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
}

function openHintModal() {
    const modal = document.getElementById("hint-modal");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
}

function closeHintModal() {
    const modal = document.getElementById("hint-modal");
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
}

function closeModalByBackdrop(event) {
    if (!event.target.classList.contains("modal-backdrop")) {
        return;
    }

    closeResultModal();
    closeHintModal();
}

function launchConfetti() {
    if (typeof confetti !== "function") {
        return;
    }

    confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.62 },
        colors: ["#5ee7ff", "#a78bfa", "#f472b6", "#34d399", "#ffffff"]
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temporary = array[i];

        array[i] = array[randomIndex];
        array[randomIndex] = temporary;
    }

    return array;
}