document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const tileCountInput = document.getElementById('tile-count');
    const startButton = document.getElementById('start-game');

    let flippedTiles = [];
    let matchedPairs = 0;
    let totalPairs = 0;
    let canFlip = true;

    // --- Image Configuration ---
    // The game will use the images from your 'car_images' folder.
    const carImages = [
        'car_images/59db694b3752880e93e16eef.png',
        'car_images/59db695b3752880e93e16ef1.png',
        'car_images/59db69633752880e93e16ef2.png',
        'car_images/59db696a3752880e93e16ef3.png',
        'car_images/59db69733752880e93e16ef4.png',
        'car_images/59db697f3752880e93e16ef5.png',
        'car_images/59db69a03752880e93e16ef7.png',
        'car_images/59db69ab3752880e93e16ef8.png',
        'car_images/59db69be3752880e93e16efa.png',
        'car_images/59db69c73752880e93e16efb.png',
        'car_images/59db69d33752880e93e16efc.png',
        'car_images/59db69ed3752880e93e16efd.png',
        'car_images/59db69fe3752880e93e16efe.png',
        'car_images/59db6a143752880e93e16f00.png',
        'car_images/59db6a243752880e93e16f01.png',
        'car_images/59db6a303752880e93e16f02.png'
    ];

    startButton.addEventListener('click', startGame);

    function startGame() {
        const tileCount = parseInt(tileCountInput.value);
        totalPairs = tileCount / 2;

        if (carImages.length < totalPairs) {
            alert(`Please add at least ${totalPairs} unique images to the 'car_images' folder and update the list in script.js.`);
            return;
        }

        // Validate tile count
        if (tileCount % 2 !== 0 || tileCount < 4) {
            alert('Please enter an even number of tiles, with a minimum of 4.');
            return;
        }

        matchedPairs = 0;
        flippedTiles = [];
        canFlip = true;
        gameBoard.innerHTML = '';

        const selectedImages = carImages.slice(0, totalPairs);
        const gameTiles = [...selectedImages, ...selectedImages];

        shuffle(gameTiles);

        // Adjust grid layout based on tile count
        const columns = Math.ceil(Math.sqrt(tileCount));
        gameBoard.style.gridTemplateColumns = `repeat(${columns}, 100px)`;

        gameTiles.forEach(image => {
            const tile = createTile(image);
            gameBoard.appendChild(tile);
        });
    }

    function createTile(image) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.image = image;

        tile.innerHTML = `
            <div class="tile-face tile-front"></div>
            <div class="tile-face tile-back">
                <img src="${image}" alt="Car" style="width: 90%; height: 90%; object-fit: contain;">
            </div>
        `;

        tile.addEventListener('click', () => handleTileClick(tile));
        return tile;
    }

    function handleTileClick(tile) {
        if (!canFlip || tile.classList.contains('flipped') || tile.classList.contains('matched')) {
            return;
        }

        tile.classList.add('flipped');
        flippedTiles.push(tile);

        if (flippedTiles.length === 2) {
            canFlip = false; // Prevent flipping more tiles
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [tile1, tile2] = flippedTiles;
        if (tile1.dataset.image === tile2.dataset.image) {
            // It's a match
            setTimeout(() => {
                tile1.classList.add('matched');
                tile2.classList.add('matched');
                matchedPairs++;
                resetFlippedTiles();
                checkIfWon();
            }, 500);
        } else {
            // Not a match
            setTimeout(() => {
                tile1.classList.remove('flipped');
                tile2.classList.remove('flipped');
                resetFlippedTiles();
            }, 1000);
        }
    }

    function resetFlippedTiles() {
        flippedTiles = [];
        canFlip = true;
    }

    function checkIfWon() {
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                alert('Congratulations! You won!');
                // Optional: Automatically start a new game or show a reset button
                // startGame();
            }, 500);
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Start a game on initial load
    startGame();
});
