import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

export class BasicLayout extends React.PureComponent<any, any> {
    static defaultProps = {
        className: 'layout',
        items: 20,
        rowHeight: 30,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onLayoutChange: function() {},
        cols: 12,
    };

    constructor(props) {
        super(props);

        const layout = this.generateLayout();
        this.state = { layout };
    }

    generateDOM() {
        return _.map(_.range(this.props.items), function(i) {
            return (
                <div key={i}>
                    <span className="text">{i}</span>
                </div>
            );
        });
    }

    generateLayout() {
        const p = this.props;
        return _.map(new Array(p.items), function(item, i) {
            const y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
            return {
                x: (i * 2) % 12,
                y: Math.floor(i / 6) * (y as number),
                w: 2,
                h: y,
                i: i.toString(),
            };
        });
    }

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
    }

    render() {
        return (
            <>
                <div>
                    Current Breakpoint: {this.state.currentBreakpoint} ({this.props.cols[this.state.currentBreakpoint]}{' '}
                    columns)
                </div>
                <div>Compaction type: {_.capitalize(this.state.compactType) || 'No Compaction'}</div>
                <ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange} {...this.props}>
                    {this.generateDOM()}
                </ReactGridLayout>
            </>
        );
    }
}
