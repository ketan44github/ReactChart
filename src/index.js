import { createRoot } from 'react-dom/client';
import './index.css';
/**
 * Sample for Bollinger Band Indicator
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries, BollingerBands, IndicatorsDirective, IndicatorDirective, RangeAreaSeries } from '@syncfusion/ej2-react-charts';
import { chartData } from './financial-data';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Bollinger sample
 */
export class Bollinger extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' load={this.load.bind(this)} style={{ textAlign: "center" }} primaryXAxis={{
                valueType: 'DateTime',
                majorGridLines: { width: 0 },
                zoomFactor: 0.2, zoomPosition: 0.6,
                crosshairTooltip: { enable: true }
            }} primaryYAxis={{
                title: 'Price',
                labelFormat: '${value}M',
                minimum: 50, maximum: 170, interval: 30,
                majorGridLines: { width: 1 },
                lineStyle: { width: 0 }
            }} chartArea={{ border: { width: 0 } }} tooltip={{
                enable: true, shared: true
            }} legendSettings={{ visible: false }} width={Browser.isDevice ? '100%' : '75%'} crosshair={{ enable: true, lineType: 'Vertical' }} zoomSettings={{ enableSelectionZooming: true, mode: 'X', enablePan: true }} title='AAPL 2012-2017' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair, LineSeries, RangeAreaSeries,
                BollingerBands]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={chartData} width={2} xName='x' yName='y' low='low' high='high' close='close' volume='volume' open='open' name='Apple Inc' bearFillColor='#2ecd71' bullFillColor='#e74c3d' type='Candle' animation={{ enable: false }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <IndicatorsDirective>
                            <IndicatorDirective type='BollingerBands' field='Close' seriesName='Apple Inc' fill='#606eff' period={14} animation={{ enable: true }} upperLine={{ color: '#ffb735', width: 1 }} lowerLine={{ color: '#f2ec2f', width: 1 }}>
                            </IndicatorDirective>
                        </IndicatorsDirective>
                    </ChartComponent>
                </div>
            </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
    load(args) {
        let selectedTheme = window.location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    }
    ;
}

const root = createRoot(document.getElementById('sample'));
root.render(<Bollinger />);