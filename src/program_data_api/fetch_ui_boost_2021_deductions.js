import { UI_BOOST_2021 } from '../program_data/ui_boost_2021_deductions.js';

export class FetchUiBoost2021Deductions {

    constructor(inputs) {
        this.ui_boost_2021 = inputs.ui_boost_2021;
    }

    calculate() {
        const ui_boost_amount = UI_BOOST_2021;

        if (this.ui_boost_2021 === true) {
            return ui_boost_amount;
        } else {
            return 0;
        }

        
    }
}

