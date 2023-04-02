import React, { ReactNode } from 'react';

interface NumberFormatProps {
    children: any;
}

const NumberFormat = ({ children }: NumberFormatProps) => {
    const formattedNumber = new Intl.NumberFormat('id-ID').format(children);

    return <>Rp {formattedNumber}</>;
};

export default NumberFormat;
