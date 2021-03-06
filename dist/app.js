document.write(`
<div id="app">
	<div>
        <canvas id="mixed-down-canvas"></canvas>
        <div id="canvas-container"></div>

        <div id="footer">
            <div id="progress-message"></div>

            <div id="progress-bar-container">
                <div id="progress-bar"></div>
                <div id="layers-progress-bar"></div>
            </div>

            <div>
                <span>current frame</span>
            </div>
            <input disabled id="frame-input" value="0">

            <button disabled id="play-button">
                <svg>
                    <path d="M 10 5 L 20 10 L 10 15 Z"></path>
                </svg>
            </button>

            <button disabled id="pause-button">
                <svg>
                    <path d="M 5 5 L 13 5 L 13 15 L 5 15 Z"></path>
                    <path d="M 17 5 L 25 5 L 25 15 L 17 15 Z"></path>
                </svg>
            </button>

            <button disabled id="rewind-button">
                <svg>
                    <path d="M 25 5 L 15 10 L 15 5 L 5 10 L 15 15 L 15 10 L 25 15 Z"></path>
                </svg>
            </button>

            <button id="snapshot-button">
                <svg>
                    <path d="M 10 5 L 20 5 L 20 7 L 10 7 Z"></path>
                    <path d="M 10 8 L 20 8 L 20 10 L 25 10 L 15 15 L 5 10 L 10 10 Z"></path>
                </svg>
            </button>
        </div>
    </div>

    <div id="sidebar">
        <svg id="logo">
            <path d="M 8,16 L 4 20 L 4 36 L 8 32 L 8 24 L 12 28 L 16 24 L 16 32 L 20 36 L 20 20 L 16 16 L 16 8 L 12 12 L 8 8 L 8 16 Z"></path>
            <path d="M 28,12 L 20 20 L 28 28 L 36 20 L 28 12 Z"></path>
            <path d="M 36,12 L 36 20 L 44 28 L 52 20 L 52 12 L 44 20 L 36 12 Z"></path>
            <path d="M 60,12 L 52 20 L 52 36 L 56 32 L 56 24 L 60 28 L 68 20 L 68 4 L 64 8 L 64 16 L 60 12 Z"></path>
            <path d="M 76,12 L 68 20 L 76 28 L 84 20 L 84 4 L 80 8 L 80 16 L 76 12 Z"></path>
            <path d="M 96,8 L 84 20 L 88 24 L 88 32 L 100 20 L 96 16 L 96 8 Z"></path>
            <path d="M 104,16 L 100 20 L 108 28 L 116 20 L 112 16 L 120 16 L 124 12 L 92 12 L 96 16 L 104 16 Z"></path>
            <path d="M 124,12 L 116 20 L 124 28 L 132 20 L 124 12 Z"></path>
            <path d="M 140,12 L 132 20 L 140 28 L 148 20 L 140 12 Z"></path>
            <path d="M 152,16 L 148 20 L 156 28 L 164 20 L 160 16 L 168 16 L 172 12 L 140 12 L 144 16 L 152 16 Z"></path>
            <path d="M 168,16 L 164 20 L 164 36 L 168 32 L 168 24 L 172 28 L 176 24 L 176 32 L 180 36 L 180 20 L 176 16 L 176 8 L 172 12 L 168 8 L 168 16 Z"></path>
        </svg>

        <div><span>a place to combine houndstooth effects</span></div>

        <div id="effect-toggles-container"></div>

        <div id="descriptions-container"></div>

        <div><span>overrides</span></div>
        <div id="override-container"></div>

        

    </div>
</div>
`)
