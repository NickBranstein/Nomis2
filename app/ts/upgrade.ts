interface IUpgrade {
    name: string;
    text: string;
    clicks: number;
    owned: number;
    improvementFactor: number;
    onFirstUpgrade?: () => void;
}