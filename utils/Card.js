import { colors } from '../constants/Index';

export function getDifficultyColor(label) {
    const pillColors = {
        easy: colors.green,
        moderate: colors.blue,
        difficult: colors.greenDark,
    };

    return pillColors[label.toLowerCase()];
}

export default getDifficultyColor;
