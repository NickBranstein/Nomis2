namespace Engine {
    export enum Sounds {
        PowerUp = 0,
        Error = 1
    }

    export class SoundManager {
        private p: HTMLAudioElement;
        private cp: any;
        private bgMusic: HTMLAudioElement;
        private song: any;
        private sounds: Array<string> = [];
        public muted: boolean;

        constructor() {
            this.p = new Audio();
            this.cp = new CPlayer();

            // construct background music
            this.setupBg();

            // to setup another sound
            this.p.volume = 1.0;
            this.sounds[Sounds.PowerUp] = this.setupSound(this.powerUpSound());
            this.sounds[Sounds.Error] = this.setupSound(this.ErrorSound());

            this.muted = false;
        }
        public playSound(sound: Sounds): void {
            this.p.src = this.sounds[sound];
            this.p.play();
        }

        public playBg(): void {
            this.bgMusic.play();
        }

        public stopBg(): void {
            this.bgMusic.pause();
        }

        public muteAll(): void {
            this.bgMusic.muted = true;
            this.p.muted = true;
            this.muted = true;
        }

        public unMuteAll(): void {
            this.bgMusic.muted = false;
            this.p.muted = false;
            this.muted = false;
        }

        private setupSound(sound: any): string {
            let done = 0;
            this.cp.init(sound);
            while (done = this.cp.generate()) {
                if (done >= 1)
                    break;
                // wait zzz...
            }
            return URL.createObjectURL(new Blob([this.cp.createWave()], { type: "audio/wav" }));
        }

        // put this mess down here so it is out of the way
        private setupBg(): void {
            this.song = {
                songData: [
                    { // Instrument 0
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            0, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            29, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            194, // LFO_AMT
                            4, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            3, // FX_FILTER
                            25, // FX_FREQ
                            191, // FX_RESONANCE
                            115, // FX_DIST
                            244, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            84, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        // Columns
                        c: [
                            {
                                n: [116, 120, 116, 125, 123, , 123, 118, 118, 120, 118, 116, 116, 116, , 116, 118, 122, 123, 118, 118, , , 125, 122, 120, 122, , 122, 122, , 118],
                                f: [21, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 48]
                            },
                            {
                                n: [128, 132, 128, 137, 135, , 135, 130, 130, 132, 130, 128, 128, 128, , 128, 130, 134, 135, 130, 130, , , 137, 134, 132, 134, , 134, 134, , 130],
                                f: [, , , , , , , , , , , , , , , , , , , , , , , , , , , 11, 13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 31]
                            }
                        ]
                    },
                    { // Instrument 1
                        i: [
                            0, // OSC1_WAVEFORM
                            255, // OSC1_VOL
                            117, // OSC1_SEMI
                            1, // OSC1_XENV
                            0, // OSC2_WAVEFORM
                            255, // OSC2_VOL
                            110, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            1, // OSC2_XENV
                            0, // NOISE_VOL
                            4, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            35, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            0, // LFO_AMT
                            0, // LFO_FREQ
                            0, // LFO_FX_FREQ
                            2, // FX_FILTER
                            14, // FX_FREQ
                            1, // FX_RESONANCE
                            1, // FX_DIST
                            39, // FX_DRIVE
                            76, // FX_PAN_AMT
                            5, // FX_PAN_FREQ
                            0, // FX_DELAY_AMT
                            0 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [, 1, 1, 1, 1, 1, 1, 2, 2, , 1, 1, 1, 1, 1, 1, 2, 2, , 1, 1, 1, 1, 1, 1, 2, 2],
                        // Columns
                        c: [
                            {
                                n: [147, , , , , , 147, , , , 147, , , , , , 147, , , , , , 147, , , , 147, , , , 147],
                                f: []
                            },
                            {
                                n: [147],
                                f: []
                            }
                        ]
                    },
                    { // Instrument 2
                        i: [
                            0, // OSC1_WAVEFORM
                            0, // OSC1_VOL
                            140, // OSC1_SEMI
                            0, // OSC1_XENV
                            0, // OSC2_WAVEFORM
                            0, // OSC2_VOL
                            140, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            60, // NOISE_VOL
                            4, // ENV_ATTACK
                            10, // ENV_SUSTAIN
                            68, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            187, // LFO_AMT
                            5, // LFO_FREQ
                            0, // LFO_FX_FREQ
                            1, // FX_FILTER
                            239, // FX_FREQ
                            135, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            108, // FX_PAN_AMT
                            5, // FX_PAN_FREQ
                            16, // FX_DELAY_AMT
                            4 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [, 1, 1, 2, 3, 2, 3, 4, 4, , 1, 1, 2, 3, 2, 3, 4, 4, , 1, 1, 2, 3, 2, 3, 4, 4],
                        // Columns
                        c: [
                            {
                                n: [, , , , 147, , , , , , , , 148, , , , , , , , 147, , , , , , , , 147],
                                f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 35]
                            },
                            {
                                n: [, , , , 147, , , 147, , , , , 148, , , , , , , , 147, , , 147, , , 147, , , , 147],
                                f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 35]
                            },
                            {
                                n: [, , , , 147, , , 147, , , , , 148, , , , , , , , 147, , , 147, , , 147, , , 147, 147, 147],
                                f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 35]
                            },
                            {
                                n: [147],
                                f: [13, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 68]
                            }
                        ]
                    },
                    { // Instrument 3
                        i: [
                            2, // OSC1_WAVEFORM
                            192, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            2, // OSC2_WAVEFORM
                            192, // OSC2_VOL
                            140, // OSC2_SEMI
                            18, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            107, // ENV_ATTACK
                            115, // ENV_SUSTAIN
                            138, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            136, // LFO_AMT
                            5, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            8, // FX_FREQ
                            92, // FX_RESONANCE
                            21, // FX_DIST
                            56, // FX_DRIVE
                            148, // FX_PAN_AMT
                            5, // FX_PAN_FREQ
                            85, // FX_DELAY_AMT
                            8 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1],
                        // Columns
                        c: [
                            {
                                n: [116, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 123],
                                f: []
                            },
                            {
                                n: [120, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , 127],
                                f: []
                            }
                        ]
                    },
                    { // Instrument 4
                        i: [
                            0, // OSC1_WAVEFORM
                            255, // OSC1_VOL
                            152, // OSC1_SEMI
                            0, // OSC1_XENV
                            0, // OSC2_WAVEFORM
                            255, // OSC2_VOL
                            152, // OSC2_SEMI
                            12, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            2, // ENV_ATTACK
                            0, // ENV_SUSTAIN
                            60, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            0, // LFO_AMT
                            0, // LFO_FREQ
                            0, // LFO_FX_FREQ
                            2, // FX_FILTER
                            255, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            47, // FX_PAN_AMT
                            3, // FX_PAN_FREQ
                            157, // FX_DELAY_AMT
                            2 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [, , , 1, 2, 1, 3, 1, 2, , , , 1, 4, 1, 5, 1, 2, , , , 1, 2, 1, 3, 1, 2],
                        // Columns
                        c: [
                            {
                                n: [120, , , , 125, , , , 123, , , , 125, , 123, , 122, , 123, , 120, , 120],
                                f: []
                            },
                            {
                                n: [120, , , , 125, , , , 123, , , , 125, , 123, , 122, , 123, , 132, , 132],
                                f: []
                            },
                            {
                                n: [120, , , , 125, , , , 123, , , , 125, , 123, , 122, , 123, , 122, , 122],
                                f: []
                            },
                            {
                                n: [144, , , , 137, , , , 135, , , , 137, , 135, , 134, , 135, , 144, , 144],
                                f: []
                            },
                            {
                                n: [132, , , , 137, , , , 135, , , , 137, , 135, , 134, , 135, , 134, , 134],
                                f: []
                            }
                        ]
                    },
                    { // Instrument 5
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 6
                        i: [
                            0, // OSC1_WAVEFORM
                            0, // OSC1_VOL
                            140, // OSC1_SEMI
                            0, // OSC1_XENV
                            0, // OSC2_WAVEFORM
                            0, // OSC2_VOL
                            140, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            255, // NOISE_VOL
                            158, // ENV_ATTACK
                            158, // ENV_SUSTAIN
                            158, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            51, // LFO_AMT
                            2, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            58, // FX_FREQ
                            239, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            88, // FX_PAN_AMT
                            1, // FX_PAN_FREQ
                            157, // FX_DELAY_AMT
                            2 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 7
                        i: [
                            0, // OSC1_WAVEFORM
                            255, // OSC1_VOL
                            106, // OSC1_SEMI
                            1, // OSC1_XENV
                            0, // OSC2_WAVEFORM
                            255, // OSC2_VOL
                            106, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            1, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            7, // ENV_SUSTAIN
                            164, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            0, // LFO_AMT
                            0, // LFO_FREQ
                            0, // LFO_FX_FREQ
                            2, // FX_FILTER
                            255, // FX_FREQ
                            0, // FX_RESONANCE
                            2, // FX_DIST
                            16, // FX_DRIVE
                            83, // FX_PAN_AMT
                            5, // FX_PAN_FREQ
                            53, // FX_DELAY_AMT
                            1 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [, , , , , , , , , 1, , , , , , , , , 1, , , , , , , , , 1],
                        // Columns
                        c: [
                            {
                                n: [147],
                                f: []
                            }
                        ]
                    }
                ],
                rowLen: 5513,   // In sample lengths
                patternLen: 32,  // Rows per pattern
                endPattern: 29  // End pattern
            };

            this.bgMusic = new Audio(this.setupSound(this.song));
            this.bgMusic.volume = 0.3;
            this.bgMusic.loop = true;
        }

        private powerUpSound(): any {
            return {
                songData: [
                    { // Instrument 0
                        i: [
                            1, // OSC1_WAVEFORM
                            255, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            1, // OSC2_WAVEFORM
                            154, // OSC2_VOL
                            128, // OSC2_SEMI
                            9, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            7, // ENV_ATTACK
                            5, // ENV_SUSTAIN
                            52, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            0, // LFO_AMT
                            0, // LFO_FREQ
                            0, // LFO_FX_FREQ
                            2, // FX_FILTER
                            255, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            47, // FX_PAN_AMT
                            3, // FX_PAN_FREQ
                            27, // FX_DELAY_AMT
                            2 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [1],
                        // Columns
                        c: [
                            {
                                n: [144, , 144, 144, 156, , , , , , , , , , , , , , , , , , , , , , , , , , , , 147, , 147, 147, 152],
                                f: []
                            }
                        ]
                    },
                    { // Instrument 1
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 2
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 3
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 4
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 5
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 6
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 7
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    }
                ],
                rowLen: 5513,   // In sample lengths
                patternLen: 32,  // Rows per pattern
                endPattern: 2  // End pattern
            };
        }

        private ErrorSound(): any {
            return {
                songData: [
                    { // Instrument 0
                        i: [
                            0, // OSC1_WAVEFORM
                            255, // OSC1_VOL
                            152, // OSC1_SEMI
                            0, // OSC1_XENV
                            0, // OSC2_WAVEFORM
                            255, // OSC2_VOL
                            152, // OSC2_SEMI
                            12, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            2, // ENV_ATTACK
                            0, // ENV_SUSTAIN
                            63, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            0, // LFO_AMT
                            0, // LFO_FREQ
                            0, // LFO_FX_FREQ
                            2, // FX_FILTER
                            255, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            47, // FX_PAN_AMT
                            3, // FX_PAN_FREQ
                            29, // FX_DELAY_AMT
                            2 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [1],
                        // Columns
                        c: [
                            {
                                n: [202],
                                f: []
                            }
                        ]
                    },
                    { // Instrument 1
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 2
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 3
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 4
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 5
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 6
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    },
                    { // Instrument 7
                        i: [
                            2, // OSC1_WAVEFORM
                            100, // OSC1_VOL
                            128, // OSC1_SEMI
                            0, // OSC1_XENV
                            3, // OSC2_WAVEFORM
                            201, // OSC2_VOL
                            128, // OSC2_SEMI
                            0, // OSC2_DETUNE
                            0, // OSC2_XENV
                            0, // NOISE_VOL
                            5, // ENV_ATTACK
                            6, // ENV_SUSTAIN
                            58, // ENV_RELEASE
                            0, // ARP_CHORD
                            0, // ARP_SPEED
                            0, // LFO_WAVEFORM
                            195, // LFO_AMT
                            6, // LFO_FREQ
                            1, // LFO_FX_FREQ
                            2, // FX_FILTER
                            135, // FX_FREQ
                            0, // FX_RESONANCE
                            0, // FX_DIST
                            32, // FX_DRIVE
                            147, // FX_PAN_AMT
                            6, // FX_PAN_FREQ
                            121, // FX_DELAY_AMT
                            6 // FX_DELAY_TIME
                        ],
                        // Patterns
                        p: [],
                        // Columns
                        c: [
                        ]
                    }
                ],
                rowLen: 5513,   // In sample lengths
                patternLen: 32,  // Rows per pattern
                endPattern: 2  // End pattern
            };
        }
    }
}