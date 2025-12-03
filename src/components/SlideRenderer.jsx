import React from 'react';
import TitleSlide from './templates/TitleSlide';
import ContentSlide from './templates/ContentSlide';
import CodeSlide from './templates/CodeSlide';

const SLIDE_COMPONENTS = {
    TitleSlide,
    ContentSlide,
    CodeSlide,
};

const SlideRenderer = ({ slide }) => {
    const Component = SLIDE_COMPONENTS[slide.type];

    if (!Component) {
        return (
            <div className="flex items-center justify-center h-full text-red-500">
                Unknown Slide Type: {slide.type}
            </div>
        );
    }

    return <Component data={slide} />;
};

export default SlideRenderer;
