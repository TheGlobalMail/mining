define([
  'jquery',
  'lodash',
  'config',
  'highcharts'
], function($, _, config, highcharts) {

  var init = function() {
    
    // Disable all charts if on ie8
    if ($('body').hasClass('ie8')){
      return;
    }

    $('#coal-exports').highcharts({
      title: {
        text: '',
        style: {
          fontSize: '0px'
        }
      },
      chart: {
        marginBottom: 100
      },
      subtitle: {
        text: 'Source: U.S. Energy Information Administration',
        align: 'left',
        verticalAlign: 'bottom',
        style: {
          color: '#8f8f8f',
          'text-transform': 'uppercase',
          font: '10px open-sans-n4,open-sans-n4,open-sans,Helvetica,Arial,sans-serif'
        },
        y: 10 
      },
      credits: {
        enabled: false
      },
      colors: [
        '#c148af',
        '#32ae6c',
        '#3485b7',
        '#b4ac53',
        '#333'
      ],
      xAxis: {
        categories: _.range(2000, 2012),
        tickmarkPlacement: 'on',
        tickInterval: 1,
        tickPosition: 'inside',
        labels: {
          enabled: false
        },
        title: {
          text: '2000-2011',
          offset: 10,
          style: {
            color: '#333'
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Exported Coal (thousand short tonnes)',
          style: {
            color: '#333'
          }
        },
        labels: {
          overflow: 'justify',
          formatter: function() {
            if (this.isFirst) {
              return 0;
            }
            var val = this.value + '';
            while (/(\d+)(\d{3})/.test(val)){
              val = val.replace(/(\d+)(\d{3})/, '$1'+','+'$2');
            }
            return val;
          }
        }
      },
      legend: {
        y: -15,
        backgroundColor: '#FFFFFF',
        borderColor: '#FFFFFF',
        reversed: true
      },
      series: [{
        name: 'Australia',
        data: [206115, 211861, 225390, 230395, 241060, 256100, 256244, 269393, 277991, 288521, 322555, 313619]
      },{
        name: 'Indonesia',
        data: [63332,71960,81777,99006,,115325,141766,201929,214825,220404,257314,294539,341140]
      },{
        name: 'Russia',
        data: [43981,49463,52377,65344,80250,98590,103351,112231,111495,119384,148912,138555]
      },{
        name: 'U.S.A.',
        data: [59834,50012,40393,43735,49316,51690,51264,60607,83478,60404,83178,108229]
      }]
    });

    $('#price-of-coal').highcharts({
      title: {
        text: '',
        style: {
          fontSize: '0px'
        }
      },
      subtitle: {
        text: 'Source: World Bank',
        align: 'left',
        verticalAlign: 'bottom',
        style: {
          color: '#8f8f8f',
          'text-transform': 'uppercase',
          font: '10px open-sans-n4,open-sans-n4,open-sans,Helvetica,Arial,sans-serif'
        },
        y: 10
      },
      chart: {
        marginBottom: 70
      },
      credits: {
        enabled: false
      },
      colors: [
        '#c148af',
        '#32ae6c',
        '#3485b7',
        '#b4ac53',
        '#333'
      ],
      xAxis: {
        labels: {
          rotation: -70,
          y: 25,
          step: 5,
          formatter: function() {
            return this.value.replace(/\w+-/, '');
          }
        },
        tickInterval: 12,
        tickmarkPlacement: 'on',
        categories: [
      'May-1983',
      'Jun-1983',
      'Jul-1983',
      'Aug-1983',
      'Sep-1983',
      'Oct-1983',
      'Nov-1983',
      'Dec-1983',
      'Jan-1984',
      'Feb-1984',
      'Mar-1984',
      'Apr-1984',
      'May-1984',
      'Jun-1984',
      'Jul-1984',
      'Aug-1984',
      'Sep-1984',
      'Oct-1984',
      'Nov-1984',
      'Dec-1984',
      'Jan-1985',
      'Feb-1985',
      'Mar-1985',
      'Apr-1985',
      'May-1985',
      'Jun-1985',
      'Jul-1985',
      'Aug-1985',
      'Sep-1985',
      'Oct-1985',
      'Nov-1985',
      'Dec-1985',
      'Jan-1986',
      'Feb-1986',
      'Mar-1986',
      'Apr-1986',
      'May-1986',
      'Jun-1986',
      'Jul-1986',
      'Aug-1986',
      'Sep-1986',
      'Oct-1986',
      'Nov-1986',
      'Dec-1986',
      'Jan-1987',
      'Feb-1987',
      'Mar-1987',
      'Apr-1987',
      'May-1987',
      'Jun-1987',
      'Jul-1987',
      'Aug-1987',
      'Sep-1987',
      'Oct-1987',
      'Nov-1987',
      'Dec-1987',
      'Jan-1988',
      'Feb-1988',
      'Mar-1988',
      'Apr-1988',
      'May-1988',
      'Jun-1988',
      'Jul-1988',
      'Aug-1988',
      'Sep-1988',
      'Oct-1988',
      'Nov-1988',
      'Dec-1988',
      'Jan-1989',
      'Feb-1989',
      'Mar-1989',
      'Apr-1989',
      'May-1989',
      'Jun-1989',
      'Jul-1989',
      'Aug-1989',
      'Sep-1989',
      'Oct-1989',
      'Nov-1989',
      'Dec-1989',
      'Jan-1990',
      'Feb-1990',
      'Mar-1990',
      'Apr-1990',
      'May-1990',
      'Jun-1990',
      'Jul-1990',
      'Aug-1990',
      'Sep-1990',
      'Oct-1990',
      'Nov-1990',
      'Dec-1990',
      'Jan-1991',
      'Feb-1991',
      'Mar-1991',
      'Apr-1991',
      'May-1991',
      'Jun-1991',
      'Jul-1991',
      'Aug-1991',
      'Sep-1991',
      'Oct-1991',
      'Nov-1991',
      'Dec-1991',
      'Jan-1992',
      'Feb-1992',
      'Mar-1992',
      'Apr-1992',
      'May-1992',
      'Jun-1992',
      'Jul-1992',
      'Aug-1992',
      'Sep-1992',
      'Oct-1992',
      'Nov-1992',
      'Dec-1992',
      'Jan-1993',
      'Feb-1993',
      'Mar-1993',
      'Apr-1993',
      'May-1993',
      'Jun-1993',
      'Jul-1993',
      'Aug-1993',
      'Sep-1993',
      'Oct-1993',
      'Nov-1993',
      'Dec-1993',
      'Jan-1994',
      'Feb-1994',
      'Mar-1994',
      'Apr-1994',
      'May-1994',
      'Jun-1994',
      'Jul-1994',
      'Aug-1994',
      'Sep-1994',
      'Oct-1994',
      'Nov-1994',
      'Dec-1994',
      'Jan-1995',
      'Feb-1995',
      'Mar-1995',
      'Apr-1995',
      'May-1995',
      'Jun-1995',
      'Jul-1995',
      'Aug-1995',
      'Sep-1995',
      'Oct-1995',
      'Nov-1995',
      'Dec-1995',
      'Jan-1996',
      'Feb-1996',
      'Mar-1996',
      'Apr-1996',
      'May-1996',
      'Jun-1996',
      'Jul-1996',
      'Aug-1996',
      'Sep-1996',
      'Oct-1996',
      'Nov-1996',
      'Dec-1996',
      'Jan-1997',
      'Feb-1997',
      'Mar-1997',
      'Apr-1997',
      'May-1997',
      'Jun-1997',
      'Jul-1997',
      'Aug-1997',
      'Sep-1997',
      'Oct-1997',
      'Nov-1997',
      'Dec-1997',
      'Jan-1998',
      'Feb-1998',
      'Mar-1998',
      'Apr-1998',
      'May-1998',
      'Jun-1998',
      'Jul-1998',
      'Aug-1998',
      'Sep-1998',
      'Oct-1998',
      'Nov-1998',
      'Dec-1998',
      'Jan-1999',
      'Feb-1999',
      'Mar-1999',
      'Apr-1999',
      'May-1999',
      'Jun-1999',
      'Jul-1999',
      'Aug-1999',
      'Sep-1999',
      'Oct-1999',
      'Nov-1999',
      'Dec-1999',
      'Jan-2000',
      'Feb-2000',
      'Mar-2000',
      'Apr-2000',
      'May-2000',
      'Jun-2000',
      'Jul-2000',
      'Aug-2000',
      'Sep-2000',
      'Oct-2000',
      'Nov-2000',
      'Dec-2000',
      'Jan-2001',
      'Feb-2001',
      'Mar-2001',
      'Apr-2001',
      'May-2001',
      'Jun-2001',
      'Jul-2001',
      'Aug-2001',
      'Sep-2001',
      'Oct-2001',
      'Nov-2001',
      'Dec-2001',
      'Jan-2002',
      'Feb-2002',
      'Mar-2002',
      'Apr-2002',
      'May-2002',
      'Jun-2002',
      'Jul-2002',
      'Aug-2002',
      'Sep-2002',
      'Oct-2002',
      'Nov-2002',
      'Dec-2002',
      'Jan-2003',
      'Feb-2003',
      'Mar-2003',
      'Apr-2003',
      'May-2003',
      'Jun-2003',
      'Jul-2003',
      'Aug-2003',
      'Sep-2003',
      'Oct-2003',
      'Nov-2003',
      'Dec-2003',
      'Jan-2004',
      'Feb-2004',
      'Mar-2004',
      'Apr-2004',
      'May-2004',
      'Jun-2004',
      'Jul-2004',
      'Aug-2004',
      'Sep-2004',
      'Oct-2004',
      'Nov-2004',
      'Dec-2004',
      'Jan-2005',
      'Feb-2005',
      'Mar-2005',
      'Apr-2005',
      'May-2005',
      'Jun-2005',
      'Jul-2005',
      'Aug-2005',
      'Sep-2005',
      'Oct-2005',
      'Nov-2005',
      'Dec-2005',
      'Jan-2006',
      'Feb-2006',
      'Mar-2006',
      'Apr-2006',
      'May-2006',
      'Jun-2006',
      'Jul-2006',
      'Aug-2006',
      'Sep-2006',
      'Oct-2006',
      'Nov-2006',
      'Dec-2006',
      'Jan-2007',
      'Feb-2007',
      'Mar-2007',
      'Apr-2007',
      'May-2007',
      'Jun-2007',
      'Jul-2007',
      'Aug-2007',
      'Sep-2007',
      'Oct-2007',
      'Nov-2007',
      'Dec-2007',
      'Jan-2008',
      'Feb-2008',
      'Mar-2008',
      'Apr-2008',
      'May-2008',
      'Jun-2008',
      'Jul-2008',
      'Aug-2008',
      'Sep-2008',
      'Oct-2008',
      'Nov-2008',
      'Dec-2008',
      'Jan-2009',
      'Feb-2009',
      'Mar-2009',
      'Apr-2009',
      'May-2009',
      'Jun-2009',
      'Jul-2009',
      'Aug-2009',
      'Sep-2009',
      'Oct-2009',
      'Nov-2009',
      'Dec-2009',
      'Jan-2010',
      'Feb-2010',
      'Mar-2010',
      'Apr-2010',
      'May-2010',
      'Jun-2010',
      'Jul-2010',
      'Aug-2010',
      'Sep-2010',
      'Oct-2010',
      'Nov-2010',
      'Dec-2010',
      'Jan-2011',
      'Feb-2011',
      'Mar-2011',
      'Apr-2011',
      'May-2011',
      'Jun-2011',
      'Jul-2011',
      'Aug-2011',
      'Sep-2011',
      'Oct-2011',
      'Nov-2011',
      'Dec-2011',
      'Jan-2012',
      'Feb-2012',
      'Mar-2012',
      'Apr-2012',
      'May-2012',
      'Jun-2012',
      'Jul-2012',
      'Aug-2012',
      'Sep-2012',
      'Oct-2012',
      'Nov-2012',
      'Dec-2012',
      'Jan-2013',
      'Feb-2013',
      'Mar-2013',
      'Apr-2013',
      'May-2013'
        ]
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Price (USD per metric tonne)',
          style: {
            color: '#333'
          }
        },
        labels: {
          overflow: 'justify',
          formatter: function() {
            if (this.isFirst) {
              return 0;
            }
            var val = this.value + '';
            while (/(\d+)(\d{3})/.test(val)){
              val = val.replace(/(\d+)(\d{3})/, '$1'+','+'$2');
            }
            return val;
          }
        }
      },
      legend: {
        enabled: false
      },
      plotOptions:{
        line: {
          marker: {
            enabled: false
          }
        }
      },
      series: [{
        name: 'Price',
        data: [
          43,
          43,
          34.75,
          34.75,
          34.75,
          34.75,
          32,
          29.25,
          29.25,
          29.25,
          29.25,
          29.25,
          29.25,
          31.75,
          31.75,
          31.75,
          31.75,
          31.75,
          32.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          33.75,
          30.75,
          30.75,
          30.75,
          30.75,
          30.75,
          30.75,
          30.75,
          30.75,
          30.75,
          29.25,
          29.25,
          29.25,
          29.25,
          24.75,
          24.75,
          24.75,
          27,
          27,
          27,
          27,
          29,
          31,
          31,
          31,
          33,
          33,
          33,
          36,
          36,
          36,
          37,
          37,
          37.5,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          38,
          40.5,
          40.5,
          40.5,
          40.5,
          40.5,
          40.5,
          40.5,
          40.5,
          40.5,
          40.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          39.5,
          37.25,
          35,
          35,
          35,
          31,
          31,
          31,
          31,
          31,
          31,
          31,
          31,
          31,
          31,
          31,
          31,
          31,
          29.5,
          29.5,
          31.4,
          33.6,
          33.1,
          33.1,
          33.1,
          33.1,
          33.1,
          36.1,
          37.1,
          37.6,
          38.35,
          37.1,
          38.77,
          40.77,
          41.05,
          40.88,
          40.93,
          40.97,
          39.59,
          39.35,
          39.37,
          39.28,
          39.01,
          39.33,
          38.2,
          38.2,
          38.4,
          38.35,
          38.1,
          37.6,
          35.7,
          35.35,
          35.23,
          34.6,
          34.5,
          35.4,
          35.73,
          34.5,
          35,
          36.93,
          37.15,
          37.15,
          33.6,
          31.4,
          31.4,
          33.44,
          31.88,
          31.18,
          30.28,
          30,
          30,
          26.2,
          27.09,
          27.1,
          26.1,
          26.1,
          26.1,
          26.1,
          26.1,
          26.1,
          26.1,
          26.1,
          26.1,
          26.1,
          26.1,
          25.6,
          25.1,
          25.1,
          25.1,
          25.1,
          25.1,
          25.1,
          25.6,
          25.6,
          25.6,
          25.6,
          27.15,
          27.15,
          27.15,
          30.75,
          32.1,
          32.1,
          32.6,
          33.5,
          33.8,
          33.9,
          34,
          33.8,
          32.8,
          32.4,
          29.4,
          27.35,
          29.1,
          29.85,
          29.55,
          28.84,
          28.63,
          26.65,
          24.9,
          24,
          24.45,
          26.25,
          26.25,
          26.25,
          26.68,
          26.95,
          26.14,
          25.13,
          24.96,
          25.82,
          26.09,
          27.13,
          28.61,
          29.46,
          32.05,
          36.43,
          40.45,
          44.73,
          52.43,
          57.05,
          60.47,
          63.8,
          65.76,
          63.48,
          59.33,
          60.67,
          56.6,
          55.98,
          56.83,
          53.46,
          54.56,
          54.91,
          54.98,
          54.64,
          54.54,
          52.63,
          48.48,
          45.49,
          40.78,
          40.96,
          46.27,
          51.11,
          53.3,
          56.65,
          56.36,
          56.12,
          56.52,
          54.58,
          50.46,
          47.2,
          49.29,
          53.3,
          54.95,
          56.68,
          59.34,
          60.13,
          60,
          66,
          72.12,
          74.3,
          73.33,
          80.15,
          90.64,
          97.5,
          98.3,
          141.43,
          126.7,
          131.79,
          142.71,
          171.16,
          192.86,
          169.71,
          160.71,
          115.71,
          98.84,
          84.27,
          85.71,
          80.76,
          65.36,
          68.1,
          69.11,
          76.48,
          79.07,
          77.68,
          72.47,
          76.15,
          84.43,
          89.04,
          103.93,
          100.92,
          101.12,
          107.3,
          107.28,
          105.2,
          102.84,
          96.19,
          101.66,
          104.41,
          114.81,
          126.74,
          141.94,
          137.53,
          135.14,
          131.25,
          127.63,
          128.67,
          129.38,
          128.71,
          131.88,
          127.92,
          121.91,
          119.53,
          124.78,
          125.38,
          115.14,
          110.99,
          102.68,
          93.42,
          94.54,
          97.5,
          95.31,
          87.7,
          92.03,
          99.51,
          99.4,
          101.72,
          97.48,
          94.03,
          93.7
          ]
      }]
    });

  };

  return {
    init: init
  };
});
