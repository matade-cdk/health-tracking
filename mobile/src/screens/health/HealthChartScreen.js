import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS, SPACING, FONTS, HEALTH_METRICS } from '../../config/constants';
import healthService from '../../services/healthService';
import { formatDate } from '../../utils/dateUtils';

const HealthChartScreen = ({ route }) => {
  const { type } = route.params;
  const [chartData, setChartData] = useState(null);
  const metric = HEALTH_METRICS[type];

  useEffect(() => {
    loadChartData();
  }, [type]);

  const loadChartData = async () => {
    try {
      const readings = await healthService.getReadingsForChart(type, 7);
      if (readings.length > 0) {
        const data = {
          labels: readings.map(r => formatDate(r.date).substring(0, 5)),
          datasets: [{
            data: readings.map(r => parseFloat(r.value)),
          }],
        };
        setChartData(data);
      }
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>{metric.icon}</Text>
        <Text style={styles.title}>{metric.name}</Text>
      </View>

      {chartData ? (
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 32}
          height={220}
          chartConfig={{
            backgroundColor: COLORS.white,
            backgroundGradientFrom: COLORS.white,
            backgroundGradientTo: COLORS.white,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={styles.chart}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No data available</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: FONTS.sizes.xlarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  chart: {
    marginVertical: SPACING.md,
    borderRadius: 16,
  },
  emptyState: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: FONTS.sizes.large,
    color: COLORS.gray,
  },
});

export default HealthChartScreen;
