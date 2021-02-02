import { MAX_ALLOTMENTS } from '../program_data/max_allotments.js';

export class FetchMaxAllotment {
    // Uses a state or territory and a household size to fetch the max allotment,
    // using arithmetic to add an additional amount to the allotment for each
    // household member beyond eight.
    constructor(inputs) {
        this.state_or_territory = inputs.state_or_territory;
        this.household_size = inputs.household_size;
        this.target_year = inputs.target_year;
    }

    state_lookup_key() {
        const NON_DEFAULT_STATES_TERRITORIES = [
            'AK_URBAN', // TODO (ARS): Handle AK regions.
            'AK_RURAL_1', // TODO (ARS): Handle AK regions.
            'AK_RURAL_2', // TODO (ARS): Handle AK regions.
            'HI',
            'GUAM',
            'VIRGIN_ISLANDS',
        ];

        return (NON_DEFAULT_STATES_TERRITORIES.indexOf(this.state_or_territory) > -1)
            ? this.state_or_territory
            : 'DEFAULT';
    }

    calculate() {
        const state_lookup_key = this.state_lookup_key();
        const scale = MAX_ALLOTMENTS[state_lookup_key][this.target_year];
        var calculated_max_allotment;

        if (0 < this.household_size && this.household_size < 9) {
            calculated_max_allotment = scale[this.household_size];
            if (this.target_year == 2021) { // Stimulus bill includes 15% boost through June 2021
                return calculated_max_allotment * 1.15;
            } else {
                return calculated_max_allotment;
            }
        } else if (9 <= this.household_size) {
            calculated_max_allotment = scale[8] + ((this.household_size - 8) * (scale['each_additional']));
            if (this.target_year == 2021) { // Stimulus bill includes 15% boost through June 2021
                return calculated_max_allotment * 1.15;
            } else {
                return calculated_max_allotment;
            }
        } else if (this.household_size <= 0) {
            throw new Error('Household size out of bounds (at or below zero).');
        }
    }
}
