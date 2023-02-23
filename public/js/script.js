"use strict";
const main = () => {
    const HTMLFactory = (selector, getById) => {
        if (getById) {
            const idFiltered = selector.startsWith('#') ? selector.split('#')[1] : selector;
            return document.getElementById(idFiltered);
        }
        return document.querySelector(selector);
    };
    const $score0 = HTMLFactory('#score--0', true);
    const $score1 = HTMLFactory('score--1', true);
    const $dice = HTMLFactory('.dice');
    const $btnNew = HTMLFactory('.btn--new');
    const $btnRoll = HTMLFactory('.btn--roll');
    const $btnHold = HTMLFactory('.btn--hold');
    const $player0 = HTMLFactory('.player--0');
    const $player1 = HTMLFactory('.player--1');
    let scores;
    let currentScore;
    let activePlayer;
    let playing;
    init();
    $score0.textContent = $score1.textContent = '0';
    $dice.classList.add('hidden');
    const switchPlayer = () => {
        HTMLFactory(`current--${activePlayer}`, true).textContent = '0';
        currentScore = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        $player0.classList.toggle('player--active');
        $player1.classList.toggle('player--active');
    };
    $btnRoll.addEventListener('click', () => {
        if (!playing)
            return;
        const diceNumber = Math.trunc(Math.random() * 6) + 1;
        $dice.classList.remove('hidden');
        $dice.src = `./public/assets/dice-${diceNumber}.png`;
        if (diceNumber !== 1) {
            currentScore += diceNumber;
            HTMLFactory(`current--${activePlayer}`, true).textContent =
                String(currentScore);
            return;
        }
        switchPlayer();
    });
    $btnHold.addEventListener('click', () => {
        if (!playing)
            return;
        scores[activePlayer] += currentScore;
        HTMLFactory(`score--${activePlayer}`, true).textContent = String(scores[activePlayer]);
        if (scores[activePlayer] >= 50) {
            playing = false;
            $dice.classList.add('hidden');
            const { classList } = HTMLFactory(`.player--${activePlayer}`);
            classList.add('player--winner');
            classList.remove('player--active');
        }
        switchPlayer();
    });
    $btnNew.addEventListener('click', init);
    function init() {
        [
            ...document.querySelectorAll('.score'),
            ...document.querySelectorAll('.current-score'),
        ].forEach((el) => (el.textContent = '0'));
        [...document.querySelectorAll('.player')].forEach((el, i) => {
            if (i === 1)
                el.classList.remove('player--active');
            el.classList.remove('player--winner');
        });
        $dice.classList.add('hidden');
        scores = [0, 0];
        currentScore = 0;
        activePlayer = 0;
        playing = true;
        playing = true;
    }
};
main();
