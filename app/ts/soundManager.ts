module Engine {
    export enum Sounds {
        Click = 0,
        Ping = 1,
        Blip = 2
    }

    export class SoundManager {
        private p: HTMLAudioElement;
        private cp: any;
        private bgMusic: HTMLAudioElement;
        private song: any;
        private sounds: Array<string> = [];

        constructor() {
            this.p = new Audio();
            this.cp = new CPlayer();

            // construct background music
            this.setupBg();

            // to setup another sound
            this.p.volume = 1.0;
            this.sounds[Sounds.Click] = this.setupSound(this.clickSound());
            this.sounds[Sounds.Ping] = this.setupSound(this.pingSound());
            this.sounds[Sounds.Blip] = this.setupSound(this.blipSound());
        }
        public playSound(sound: Sounds): void {
            this.p.src = this.sounds[sound];
            this.p.play();
        }   

        public playBg(): void{
            this.bgMusic.play();
        }
        
        public stopBg(): void{
            this.bgMusic.pause();
        }

        private setupSound(sound: any): string {
            let done = 0;
            this.cp.init(sound);
            while(done = this.cp.generate()){
            if(done >= 1)
                break;
            // wait zzz...
            }
            return URL.createObjectURL(new Blob([this.cp.createWave()], {type: "audio/wav"}));
        }

        // put this mess down here so it is out of the way
        private setupBg(): void{
            this.song = { 
            songData: [
                { // Instrument 0
                i: [
                1, // OSC1_WAVEFORM
                192, // OSC1_VOL
                128, // OSC1_SEMI
                0, // OSC1_XENV
                1, // OSC2_WAVEFORM
                191, // OSC2_VOL
                116, // OSC2_SEMI
                9, // OSC2_DETUNE
                0, // OSC2_XENV
                0, // NOISE_VOL
                6, // ENV_ATTACK
                22, // ENV_SUSTAIN
                34, // ENV_RELEASE
                0, // ARP_CHORD
                0, // ARP_SPEED
                0, // LFO_WAVEFORM
                69, // LFO_AMT
                3, // LFO_FREQ
                1, // LFO_FX_FREQ
                1, // FX_FILTER
                23, // FX_FREQ
                167, // FX_RESONANCE
                0, // FX_DIST
                32, // FX_DRIVE
                77, // FX_PAN_AMT
                6, // FX_PAN_FREQ
                25, // FX_DELAY_AMT
                6 // FX_DELAY_TIME
                ],
                // Patterns
                p: [1,1,1],
                // Columns
                c: [
                    {n: [159,158,152,161,152,156,158,147,149,151,151,151,152,158,159,147,161,158,151,156,152,159,147,161,158,152,156,147],
                    f: []}
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
            endPattern: 4  // End pattern
            };

            this.bgMusic = new Audio(this.setupSound(this.song));
            this.bgMusic.volume = 0.3;
            this.bgMusic.loop = true;
        }

        private clickSound(): any{
             return {
            songData: [
                { // Instrument 0
                i: [
                0, // OSC1_WAVEFORM
                0, // OSC1_VOL
                140, // OSC1_SEMI
                0, // OSC1_XENV
                0, // OSC2_WAVEFORM
                0, // OSC2_VOL
                142, // OSC2_SEMI
                0, // OSC2_DETUNE
                0, // OSC2_XENV
                60, // NOISE_VOL
                4, // ENV_ATTACK
                3, // ENV_SUSTAIN
                0, // ENV_RELEASE
                0, // ARP_CHORD
                0, // ARP_SPEED
                0, // LFO_WAVEFORM
                187, // LFO_AMT
                5, // LFO_FREQ
                0, // LFO_FX_FREQ
                1, // FX_FILTER
                255, // FX_FREQ
                135, // FX_RESONANCE
                0, // FX_DIST
                32, // FX_DRIVE
                108, // FX_PAN_AMT
                5, // FX_PAN_FREQ
                0, // FX_DELAY_AMT
                4 // FX_DELAY_TIME
                ],
                // Patterns
                p: [1],
                // Columns
                c: [
                    {n: [122],
                    f: []}
                ]
                },
                { // Instrument 1
                i: [
                1, // OSC1_WAVEFORM
                255, // OSC1_VOL
                128, // OSC1_SEMI
                0, // OSC1_XENV
                1, // OSC2_WAVEFORM
                231, // OSC2_VOL
                92, // OSC2_SEMI
                62, // OSC2_DETUNE
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
                3, // FX_FREQ
                0, // FX_RESONANCE
                0, // FX_DIST
                32, // FX_DRIVE
                47, // FX_PAN_AMT
                3, // FX_PAN_FREQ
                28, // FX_DELAY_AMT
                2 // FX_DELAY_TIME
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

        private pingSound(): any{
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
                        {n: [202],
                        f: []}
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

        private blipSound(): any{
            return {
                songData: [
                    { // Instrument 0
                    i: [
                    1, // OSC1_WAVEFORM
                    255, // OSC1_VOL
                    128, // OSC1_SEMI
                    0, // OSC1_XENV
                    1, // OSC2_WAVEFORM
                    28, // OSC2_VOL
                    100, // OSC2_SEMI
                    3, // OSC2_DETUNE
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
                    25, // FX_DELAY_AMT
                    2 // FX_DELAY_TIME
                    ],
                    // Patterns
                    p: [1],
                    // Columns
                    c: [
                        {n: [122],
                        f: []}
                    ]
                    },
                    { // Instrument 1
                    i: [
                    1, // OSC1_WAVEFORM
                    255, // OSC1_VOL
                    128, // OSC1_SEMI
                    0, // OSC1_XENV
                    1, // OSC2_WAVEFORM
                    231, // OSC2_VOL
                    92, // OSC2_SEMI
                    62, // OSC2_DETUNE
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
                    3, // FX_FREQ
                    0, // FX_RESONANCE
                    0, // FX_DIST
                    32, // FX_DRIVE
                    47, // FX_PAN_AMT
                    3, // FX_PAN_FREQ
                    28, // FX_DELAY_AMT
                    2 // FX_DELAY_TIME
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