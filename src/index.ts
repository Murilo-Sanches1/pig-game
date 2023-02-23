const main = (): void => {
  const HTMLFactory = <T>(selector: string, getById?: boolean): T => {
    if (getById) {
      const idFiltered: string = selector.startsWith('#') ? selector.split('#')[1] : selector;
      return document.getElementById(idFiltered)! as T;
    }

    return document.querySelector(selector)! as T;
  };

  const $score0: HTMLParagraphElement = HTMLFactory<HTMLParagraphElement>('#score--0', true);
  const $score1: HTMLParagraphElement = HTMLFactory<HTMLParagraphElement>('score--1', true);
  const $dice: HTMLImageElement = HTMLFactory<HTMLImageElement>('.dice');
  const $btnNew: HTMLButtonElement = HTMLFactory<HTMLButtonElement>('.btn--new');
  const $btnRoll: HTMLButtonElement = HTMLFactory<HTMLButtonElement>('.btn--roll');
  const $btnHold: HTMLButtonElement = HTMLFactory<HTMLButtonElement>('.btn--hold');
  const $player0: HTMLElement = HTMLFactory<HTMLElement>('.player--0');
  const $player1: HTMLElement = HTMLFactory<HTMLElement>('.player--1');

  let scores: [number, number];
  let currentScore: number;
  let activePlayer: number;
  let playing: boolean;

  init();

  $score0.textContent = $score1.textContent = '0';
  $dice.classList.add('hidden');

  const switchPlayer = (): void => {
    HTMLFactory<HTMLParagraphElement>(`current--${activePlayer}`, true).textContent = '0';
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    $player0.classList.toggle('player--active');
    $player1.classList.toggle('player--active');
  };

  $btnRoll.addEventListener('click', () => {
    if (!playing) return;

    const diceNumber: number = Math.trunc(Math.random() * 6) + 1;
    $dice.classList.remove('hidden');
    $dice.src = `./public/assets/dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      HTMLFactory<HTMLParagraphElement>(`current--${activePlayer}`, true).textContent =
        String(currentScore);

      return;
    }

    switchPlayer();
  });

  $btnHold.addEventListener('click', () => {
    if (!playing) return;

    scores[activePlayer] += currentScore;
    HTMLFactory<HTMLParagraphElement>(`score--${activePlayer}`, true).textContent = String(
      scores[activePlayer]
    );

    if (scores[activePlayer] >= 50) {
      playing = false;
      $dice.classList.add('hidden');
      const { classList } = HTMLFactory<HTMLElement>(`.player--${activePlayer}`);
      classList.add('player--winner');
      classList.remove('player--active');
    }

    switchPlayer();
  });

  $btnNew.addEventListener('click', init);

  function init(): void {
    [
      ...(document.querySelectorAll<HTMLParagraphElement>(
        '.score'
      )! as NodeListOf<HTMLParagraphElement>),
      ...(document.querySelectorAll<HTMLParagraphElement>(
        '.current-score'
      )! as NodeListOf<HTMLParagraphElement>),
    ].forEach((el: HTMLParagraphElement) => (el.textContent = '0'));

    [...(document.querySelectorAll<HTMLElement>('.player')! as NodeListOf<HTMLElement>)].forEach(
      (el: HTMLElement, i: number): void => {
        if (i === 1) el.classList.remove('player--active');

        el.classList.remove('player--winner');
      }
    );
    $dice.classList.add('hidden');
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    playing = true;
  }
};

main();
