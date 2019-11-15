import { useModelItem } from 'components/model-item/context/model-item.context';
import { useItemLayouts } from 'components/model-item/use-item-layouts';
import React, { useState, FC } from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { ImagePreview } from '../image-preview/image-preview';
import { RelationCard } from '../relation-card';
import showdown from 'showdown';

const ReactGridLayout = WidthProvider(RGL);

const ToolTip: FC<{}> = ({ children }) => {
    return <div className="absolute w-64 px-2 py-1 mb-6 bottom-0 bg-white shadow border rounded-sm">{children}</div>;
};

const InfoIcon = ({ className }) => {
    const [showTip, setShowTip] = useState(false);

    return (
        <div className="ml-auto relative">
            {showTip && (
                <ToolTip>
                    <span className="text-sm text-gray-700">
                        This is not a perfect representation of your image. You will still need to style it on your
                        front end application
                    </span>
                </ToolTip>
            )}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className={className}
                onMouseEnter={e => setShowTip(true)}
                onMouseLeave={e => setShowTip(false)}
            >
                <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
        </div>
    );
};

export const GridLayouts = () => {
    const { metadata, layouts, setLayouts } = useModelItem();
    const { item, attributeLayouts, relationalLayouts, relationalData } = useItemLayouts();
    const mdConverter = new showdown.Converter();

    // relational data won't have the right y positions, but they
    // will change based on what is filtered
    const adjustRelationYPos = () => {
        let adjusted: Layout[] = [];
        const yPostions: number[] = attributeLayouts.map(x => x.y);

        // if no yPositions give a value of 0
        const adjPos = yPostions.length ? Math.max(...yPostions) : 0;

        for (const layout of relationalLayouts) {
            adjusted = [...adjusted, { ...layout, y: layout.y + adjPos }];
        }
        return adjusted;
    };

    const combineLayouts = (attributes: Layout[]) => {
        return [...attributes, ...adjustRelationYPos()];
    };

    if (!layouts) {
        return <div>loading...</div>;
    }

    const imageTypes = ['image', 'previewImage'];

    return (
        <>
            <ReactGridLayout
                className="bg-gray-200"
                layout={combineLayouts(attributeLayouts)}
                onLayoutChange={changedLayouts => {
                    setLayouts(changedLayouts);
                }}
            >
                {/* Layout the metadata edit fields */}
                {/* eslint-disable-next-line array-callback-return */}
                {attributeLayouts.map(({ i }) => {
                    const index = i as string;
                    if (imageTypes.includes(index)) {
                        return (
                            <div key={i} className="rounded shadow bg-white pb-6">
                                {/* Componentize */}
                                <div className="flex px-2 border-b-2 h-6 items-center">
                                    <span>{i}</span>
                                    <InfoIcon className="fill-current antialiased text-gray-500 ml-auto h-5 w-5 hover:text-gray-800" />
                                </div>
                                <ImagePreview image={item[index]} className="h-full w-full object-cover" />
                            </div>
                        );
                    }
                    // if we have richtext editor content, attempt to convert it to html
                    else if (metadata.schema.attributes[index].type === 'richtext') {
                        const content = mdConverter.makeHtml(item[i as string]);
                        return (
                            <div key={i} className="rounded shadow bg-white">
                                {/* Componentize */}
                                <div className="px-2 border-b-2">{i}</div>

                                <div className="h-full w-full object-fill">
                                    <span dangerouslySetInnerHTML={{ __html: content }}></span>
                                </div>
                            </div>
                        );
                    } else if (index) {
                        return (
                            <div key={i} className="rounded shadow bg-white">
                                {/* Componentize */}
                                <div className="px-2 border-b-2">{i}</div>
                                <span className="p-2">{item[i as string]}</span>
                            </div>
                        );
                    }
                })}
                {relationalData.map(relation => {
                    return (
                        <div key={relation.id} className="rounded shadow bg-white">
                            <RelationCard relation={relation} />
                        </div>
                    );
                })}
            </ReactGridLayout>
        </>
    );
};
