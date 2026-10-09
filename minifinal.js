import React, { useState } from 'react';
import { Heart, Thermometer, Activity, HeartPulse, History, Settings, Phone } from 'lucide-react';
import Header from './components/Header';
import VitalCard from './components/VitalCard';
import ECGWave from './components/ECGWave';
import HistoricalChart from './components/HistoricalChart';
import RiskPredictionPanel from './components/RiskPredictionPanel';
import BottomNavigation from './components/BottomNavigation';
import { vitalSignsData, riskPrediction, historicalData, ecgPatternAnalysis } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Vital Signs Grid */}
      <div className="grid grid-cols-2 gap-4">
        <VitalCard
          type="Heart Rate"
          value={vitalSignsData.heartRate.value}
          unit={vitalSignsData.heartRate.unit}
          status={vitalSignsData.heartRate.status}
          lastUpdated={vitalSignsData.heartRate.lastUpdated}
          icon={Heart}
        />
        <VitalCard
          type="Temperature"
          value={vitalSignsData.temperature.value}
          unit={vitalSignsData.temperature.unit}
          status={vitalSignsData.temperature.status}
          lastUpdated={vitalSignsData.temperature.lastUpdated}
          icon={Thermometer}
        />
        <VitalCard
          type="SpO2"
          value={vitalSignsData.spO2.value}
          unit={vitalSignsData.spO2.unit}
          status={vitalSignsData.spO2.status}
          lastUpdated={vitalSignsData.spO2.lastUpdated}
          icon={Activity}
        />
        <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <HeartPulse className="w-5 h-5 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-700">ECG</h3>
            </div>
            <div className="w-3 h-3 rounded-full bg-medical-green"></div>
          </div>
          <div className="mb-2">
            <span className="text-2xl font-bold text-medical-green">
              {vitalSignsData.ecg.value}
            </span>
            <span className="text-sm text-gray-500 ml-1">rhythm</span>
          </div>
          <ECGWave />
          <div className="text-xs text-gray-500 mt-2">
            Last updated: {vitalSignsData.ecg.lastUpdated}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Source: Smart Armband
          </div>
        </div>
      </div>

      {/* Risk Prediction Panel */}
      <RiskPredictionPanel 
        riskLevel={riskPrediction.level}
        confidence={riskPrediction.confidence}
      />

      {/* Historical Data Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Historical Data</h2>
          <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-medical-teal focus:border-transparent">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <HistoricalChart
            data={historicalData.heartRate}
            title="Heart Rate Trend"
            color="#DC2626"
            unit=" bpm"
          />
          <HistoricalChart
            data={historicalData.temperature}
            title="Body Temperature"
            color="#D97706"
            unit="°F"
          />
          <HistoricalChart
            data={historicalData.spO2}
            title="SpO2 Levels"
            color="#0369A1"
            unit="%"
          />
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">ECG Pattern Analysis</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">{ecgPatternAnalysis.rhythm}</span>
              </div>
            </div>
            
            {/* ECG Measurements */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Heart Rate</div>
                <div className="text-lg font-semibold text-gray-800">{ecgPatternAnalysis.heartRate} bpm</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">PR Interval</div>
                <div className="text-lg font-semibold text-gray-800">{ecgPatternAnalysis.prInterval}ms</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">QRS Duration</div>
                <div className="text-lg font-semibold text-gray-800">{ecgPatternAnalysis.qrsDuration}ms</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">QT Interval</div>
                <div className="text-lg font-semibold text-gray-800">{ecgPatternAnalysis.qtInterval}ms</div>
              </div>
            </div>

            {/* Pattern Analysis */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Pattern Analysis</h4>
              {ecgPatternAnalysis.patterns.map((pattern, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{pattern.name}</div>
                    <div className="text-xs text-gray-600">{pattern.description}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      pattern.status === 'Normal' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-xs text-gray-600">{pattern.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Last analysis: {ecgPatternAnalysis.lastAnalysis}</span>
                <span className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Risk: {ecgPatternAnalysis.riskLevel}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Historical Reports</h2>
        <p className="text-gray-600">Detailed historical analysis and reports will be available here.</p>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="text-center py-12">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Settings</h2>
        <p className="text-gray-600">Configure your device settings and preferences here.</p>
      </div>
    </div>
  );

  const renderEmergency = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <Phone className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-red-800 mb-2">Emergency Contacts</h2>
        <p className="text-red-700 mb-4">In case of emergency, contact:</p>
        <div className="space-y-2">
          <button className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Call 911
          </button>
          <button className="w-full bg-white border border-red-300 text-red-700 py-3 px-4 rounded-lg font-semibold hover:bg-red-50 transition-colors">
            Contact Doctor
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'history':
        return renderHistory();
      case 'settings':
        return renderSettings();
      case 'emergency':
        return renderEmergency();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 pb-20">
        {renderContent()}
      </main>
      
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
