import React, { useCallback, useEffect, useRef } from 'react';
import { useGetResizeableElementRef } from '../hooks/useGetResizeableElementRef';
import millify from 'millify';
import * as d3 from 'd3';
import { Box } from '@mui/material';

const SparklineGraph = ({ sparklineData, entityId, strokeColor, contHeight }) => {
  const config = useRef({
    svg: null,
    chart: null,
    width: 0,
    height: contHeight || 128,
    margin: 0,
  });
  const self = config.current;
  const viewData = sparklineData.map((dp, i) => ({
    id: i+1,
    price: parseFloat(millify(dp, { precision: 8 }))
  }));

  const { elementRef, dimComparable } = useGetResizeableElementRef(true);

  const renderGraph = useCallback((element) => {
    self.width = element?.clientWidth || 0;
    self.svg = d3.select(element)
      .append('svg')
      .attr('width', self.width)
      .attr('height', self.height + self.margin * 2);
    self.chart = self.svg
      .append('g')
      .attr('class', 'chart-container')
      .attr('transform', `translate(${0},${self.margin})`);
  }, [self]);

  const renderLine = useCallback(() => {
    self.svg.append('defs')
    .html(`
    <linearGradient id="linear-gradient-${entityId}" gradientTransform="rotate(90)">
      <stop offset="0%" stop-color="${strokeColor}40" stop-opacity="0.5" />
      <stop offset="100%" stop-color="#fff" />
    </linearGradient>
    `)
    const xScale = d3.scaleLinear()
      .domain([1, 24])
      .range([0, self.width]);
    const yScale = d3.scaleLinear()
      .domain(d3.extent(viewData.map(d => d.price)))
      .range([self.height, 0]);
    self.chart
      .append('path')
      .datum(viewData)
      .attr('d', d3.line().x(d => xScale(d.id)).y(d => yScale(d.price)))
      .attr('fill', 'transparent')
      .attr('stroke', strokeColor)
      .attr('stroke-width', 2);
    self.chart
      .append('path')
      .datum(viewData)
      .attr('d', d3.area().x(d => xScale(d.id)).y0(self.height).y1(d => yScale(d.price)))
      .attr('fill', `url(#linear-gradient-${entityId})`)
      .attr('stroke-width', 0);
  }, [self, viewData, strokeColor, entityId]);

  useEffect(() => {
    const element = elementRef.current;
    if(element) {
      renderGraph(element);
      renderLine();

      return () => { element.innerHTML = '' }
    }
  }, [dimComparable, elementRef, renderGraph, renderLine]);

  return (
    <Box sx={{ height: self.height + self.margin * 2}} ref={elementRef}></Box>
  )
}

export default SparklineGraph