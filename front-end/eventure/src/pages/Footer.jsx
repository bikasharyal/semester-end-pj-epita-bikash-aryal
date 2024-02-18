import React from 'react';
import PopUpMessage from './PopUpMessage';

function Footer(){
    return (
        <div className="bg-gray-800 text-white p-1 flex justify-between items-center">
            
            <PopUpMessage />
            <label className="text-right">@Eventure. All rights reserved.</label>
        </div>
    );
}
export default Footer;