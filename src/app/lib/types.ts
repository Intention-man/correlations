
export interface MoodEntry {
    id?: number;
    date: string;
    text: string;
    mood: number; // Например, от 1 до 5 (1 - плохое, 5 - отличное)
}


export interface MoodChartProps {
    data: MoodEntry[];
}