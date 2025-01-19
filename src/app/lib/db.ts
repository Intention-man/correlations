import Dexie, { Table } from 'dexie';
import {MoodEntry} from '../lib/types';

export class MoodDatabase extends Dexie {
    moods!: Table<MoodEntry, number>;

    constructor() {
        super('MoodDatabase');
        this.version(1).stores({
            moods: '++id, date', // Индекс по ID и дате
        });
    }
}

export const db = new MoodDatabase();