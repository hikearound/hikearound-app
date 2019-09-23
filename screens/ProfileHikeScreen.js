import firebase from 'firebase';
import HikeScreen from './HikeScreen';

class ProfileHikeScreen extends HikeScreen {
    componentDidMount() {
        const { description } = this.state;
        if (!description) {
            this.getAdditionalHikeData();
        }
        this.initializeMap();
    }

    getHikeSnapshot = async () => {
        const { id } = this.state;
        const firestore = firebase.firestore();
        return firestore.collection('hikes').doc(id).get();
    }

    getAdditionalHikeData = async () => {
        const hikeSnapshot = await this.getHikeSnapshot();
        this.setAdditionalHikeData(hikeSnapshot);
    }

    setAdditionalHikeData = async (hikeSnapshot) => {
        const {
            city,
            description,
            images,
            elevation,
            route,
        } = hikeSnapshot.data();

        this.setState({
            city,
            description,
            images,
            elevation,
            route,
        });
    };
}

export default ProfileHikeScreen;
