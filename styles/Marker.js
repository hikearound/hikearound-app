import { colors } from '../constants/Index';

export const triangle = {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.purple,
    transform: [{ rotate: '180deg' }],
    position: 'absolute',
    top: 22,
    left: 10,
    zIndex: 1,
};

export default triangle;
