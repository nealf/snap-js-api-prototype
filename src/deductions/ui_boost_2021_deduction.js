import { FetchUiBoost2021Deductions } from '../program_data_api/fetch_ui_boost_2021_deductions.js';

export class UiBoost2021Deduction {
    constructor(inputs) {
        this.ui_boost_2021 = inputs.ui_boost_2021;
    }

    calculate() {
        const deductions_api = new FetchUiBoost2021Deductions({
            'ui_boost_2021': this.ui_boost_2021,
        });

        const result = deductions_api.calculate();

        if (result >= 0) {
            const explanation = [
                `Since the temporary unemployment income boost for 2021 was included in income, we'll deduct the $${result} as it should be excluded.`
            ];
        } else {
            const explanation = [
                `Since the temporary unemployment income boost for 2021 was not included in income, we do not need to exclude it.`
            ]
        }

        return {
            'result': result,
            'explanation': explanation
        };
    }
}

