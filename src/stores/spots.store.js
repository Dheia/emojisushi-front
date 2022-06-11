import {makeAutoObservable} from "mobx";
import AccessService from "../services/access.service";

class Spots {

    constructor() {
        makeAutoObservable(this);
    }

    loading = false;
    items = [];
    selectedIndex = 0;

    setSelectedIndex = (index) => {
        this.selectedIndex = index;
    }

    setLoading = (state) => {
        this.loading = state;
    }

    fetchItems = (params = {}) => {
        this.setLoading(false);
        AccessService.getSpots(params).then((res) => {
            this.setItems(res.data.data);
            this.setLoading(false);
        })
    }

    setItems = (items) => {
        this.items = items;
    }
}

const SpotsStore = new Spots();

export {
    SpotsStore
}