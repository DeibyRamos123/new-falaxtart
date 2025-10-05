import React, { useState } from 'react'
import '../../../../styles/PremiumCardProfile.css';

export function PremiumCard({ register, img, coverImg }) {

    const [selectedColorTheme, setSelectedColorTheme] = useState('#5D3FD3');
    const [gradientColorTheme, setGradientColorTheme] = useState('#0000');
    const [selectedColorBg, setColorBg] = useState('#1B1C1D');


    const handleColorChange = (event) => {
        setSelectedColorTheme(event.target.value);
    }

    const handleGradientChange = (event) => {
        setGradientColorTheme(event.target.value);
    }

    const handleColorChangeBg = (event) => {
        setColorBg(event.target.value)
    }

    return (
        <div className='premium-card__section'>
            <h3 className='premium-card__title'> vista previa de FalaxPremium</h3>

            <div
                className='premium-card__preview'
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${selectedColorBg} 62%, ${gradientColorTheme} 100%)`
                }}
            >

                <div className='premium-card__preview__cover-container'>
                    <img src={coverImg} alt="coverImagePreview" className='premium-card__preview__cover' />
                </div>
                <div className='premium-card__preview__profile-container'>
                    <img src={img} alt="ProfileImagePreview" className='premium-card__preview__profile' style={{ borderColor: `${selectedColorTheme}` }} />
                </div>
            </div>


            <div className='premium-card__color-picker'>
                <div className='premium-card__color-picker__group'>
                    <input
                        type='color'
                        className='premium-card__color-picker__group__input'
                        value={selectedColorTheme}
                        style={{ borderColor: selectedColorTheme }}
                        onChange={handleColorChange}
                    />
                    <p className='premium-card__color-picker__group__title'>Borde</p>
                </div>

                <div className='premium-card__color-picker__group'>
                    <input
                        type='color'
                        className='premium-card__color-picker__group__input'
                        value={selectedColorBg}
                        style={{ borderColor: selectedColorBg }}
                        onChange={handleColorChangeBg}
                    />
                    <p className='premium-card__color-picker__group__title'>primario</p>
                </div>

                <div className='premium-card__color-picker__group'>
                    <input
                        type='color'
                        className='premium-card__color-picker__group__input'
                        value={gradientColorTheme}
                        style={{ borderColor: gradientColorTheme }}
                        onChange={handleGradientChange}
                    />
                    <p className='premium-card__color-picker__group__title'>Secundario</p>
                </div>
            </div>

        </div>
    )
}
