import React, { useState } from 'react';
import Select from 'react-select';

export const MultiSelect = ({ defaultTags, setValue }) => {
    const defaultTagOptions = defaultTags?.map(tag => ({ value: tag, label: tag })) || [];
    console.log(defaultTagOptions)

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleMultiSelectChange = (selectedOptions) => {
        console.log(selectedOptions)
        setValue(selectedOptions.map((select) => select.value));
        setSelectedOptions(selectedOptions);
    };

    return (
        <>
            <Select
                isMulti
                options={defaultTagOptions}
                value={selectedOptions}
                onChange={handleMultiSelectChange}
            />
        </>
    );
};

export const SelectComponent = ({ options, setSelect }) => {
    const handleSelect = (event) => {
        const { value } = event.target;
        setSelect((prev) => ({ ...prev, id: +value }));
    };

    return (
        <>
            <div className="form-floating mb-3">
                <select className="form-control" onChange={(event) => handleSelect(event)}>
                    <option value="">Select...</option>
                    {/* <option value="0">0</option> */}
                    {options?.map((option, index) => <option key={index} value={option.value}>{option.label}</option>)}
                </select>
                <label htmlFor="floatingInput">Tecnologia</label>
            </div>
        </>
    )

}
