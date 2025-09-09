import React, { useState, useEffect } from 'react';
import { Search, X, Plus, RefreshCw, TrendingUp, Shield, Cloud, BarChart3, Activity, AlertCircle, CheckCircle, Clock, ChevronDown, Filter, Calendar, Bell, Settings, User } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const App = () => {
  // Sample data for charts - these will be used as templates for new widgets
  const cloudAccountsData = [
    { name: 'Connected', value: 2, color: '#3B82F6' },
    { name: 'Not Connected', value: 2, color: '#EF4444' }
  ];

  const riskAssessmentData = [
    { name: 'Failed', value: 1689, color: '#EF4444' },
    { name: 'Warning', value: 681, color: '#F59E0B' },
    { name: 'Not available', value: 36, color: '#6B7280' },
    { name: 'Passed', value: 7253, color: '#10B981' }
  ];

  const namespaceData = [
    { name: 'Namespace 1', alerts: 45 },
    { name: 'Namespace 2', alerts: 38 },
    { name: 'Namespace 3', alerts: 32 },
    { name: 'Namespace 4', alerts: 28 },
    { name: 'Namespace 5', alerts: 22 }
  ];

  const workloadAlertsData = [
    { time: '00:00', critical: 10, high: 15, medium: 20, low: 25 },
    { time: '04:00', critical: 15, high: 20, medium: 18, low: 22 },
    { time: '08:00', critical: 25, high: 30, medium: 35, low: 30 },
    { time: '12:00', critical: 20, high: 25, medium: 30, low: 28 },
    { time: '16:00', critical: 18, high: 22, medium: 25, low: 26 },
    { time: '20:00', critical: 12, high: 18, medium: 22, low: 24 }
  ];

  const imageRiskData = [
    { name: 'Critical', value: 9, color: '#991B1B' },
    { name: 'High', value: 150, color: '#EF4444' },
    { name: 'Medium', value: 600, color: '#F59E0B' },
    { name: 'Low', value: 711, color: '#FCD34D' }
  ];

  const securityIssuesData = [
    { name: 'Images', passed: 2, failed: 0 }
  ];

  // Function to generate sample data based on type
  const generateSampleData = (type) => {
    switch (type) {
      case 'donut':
        return [
          { name: 'Category A', value: Math.floor(Math.random() * 100), color: '#3B82F6' },
          { name: 'Category B', value: Math.floor(Math.random() * 100), color: '#EF4444' },
          { name: 'Category C', value: Math.floor(Math.random() * 100), color: '#10B981' },
          { name: 'Category D', value: Math.floor(Math.random() * 100), color: '#F59E0B' }
        ];
      case 'bar':
        return [
          { name: 'Item 1', value: Math.floor(Math.random() * 100), alerts: Math.floor(Math.random() * 100) },
          { name: 'Item 2', value: Math.floor(Math.random() * 80), alerts: Math.floor(Math.random() * 80) },
          { name: 'Item 3', value: Math.floor(Math.random() * 60), alerts: Math.floor(Math.random() * 60) },
          { name: 'Item 4', value: Math.floor(Math.random() * 40), alerts: Math.floor(Math.random() * 40) },
          { name: 'Item 5', value: Math.floor(Math.random() * 20), alerts: Math.floor(Math.random() * 20) }
        ];
      case 'line':
        return [
          { time: '00:00', critical: 10, high: 15, medium: 20, low: 25 },
          { time: '04:00', critical: 15, high: 20, medium: 18, low: 22 },
          { time: '08:00', critical: 25, high: 30, medium: 35, low: 30 },
          { time: '12:00', critical: 20, high: 25, medium: 30, low: 28 },
          { time: '16:00', critical: 18, high: 22, medium: 25, low: 26 },
          { time: '20:00', critical: 12, high: 18, medium: 22, low: 24 }
        ];
      default:
        return null;
    }
  };

  // Initial dashboard data structure
  const initialDashboardData = {
    categories: [
      {
        id: 'cspm-executive',
        name: 'CSPM Executive Dashboard',
        widgets: [
          { 
            id: 'w1', 
            name: 'Cloud Accounts', 
            type: 'donut',
            data: cloudAccountsData,
            stats: { connected: 2, total: 4 }
          },
          { 
            id: 'w2', 
            name: 'Cloud Account Risk Assessment', 
            type: 'donut',
            data: riskAssessmentData,
            stats: { total: 9659, failed: 1689, warning: 681, passed: 7253 }
          }
        ]
      },
      {
        id: 'cwpp-dashboard',
        name: 'CWPP Dashboard',
        widgets: [
          { 
            id: 'w3', 
            name: 'Top 5 Namespace Specific Alerts', 
            type: 'bar',
            data: namespaceData,
            noData: false
          },
          { 
            id: 'w4', 
            name: 'Workload Alerts', 
            type: 'line',
            data: workloadAlertsData,
            noData: false
          }
        ]
      },
      {
        id: 'registry-scan',
        name: 'Registry Scan',
        widgets: [
          { 
            id: 'w5', 
            name: 'Image Risk Assessment', 
            type: 'donut',
            data: imageRiskData,
            stats: { total: 1470, critical: 9, high: 150 }
          },
          { 
            id: 'w6', 
            name: 'Image Security Issues', 
            type: 'bar',
            data: securityIssuesData,
            stats: { total: 2, passed: 2, failed: 0 }
          }
        ]
      },
      {
        id: 'ticket',
        name: 'Ticket',
        widgets: []
      }
    ]
  };

  // State management
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newWidget, setNewWidget] = useState({ name: '', text: '', type: 'text' });
  const [allWidgets, setAllWidgets] = useState([]);
  const [timeRange, setTimeRange] = useState('Last 2 days');
  const [showManageWidgets, setShowManageWidgets] = useState(false);

  // Update all widgets list
  useEffect(() => {
    const widgets = [];
    dashboardData.categories.forEach(cat => {
      cat.widgets.forEach(widget => {
        widgets.push({ ...widget, categoryId: cat.id, categoryName: cat.name });
      });
    });
    setAllWidgets(widgets);
  }, [dashboardData]);

  // Add widget function with proper data generation
  const handleAddWidget = () => {
    if (!selectedCategory || !newWidget.name) {
      alert('Please fill all fields and select a category');
      return;
    }

    // Generate appropriate data based on widget type
    let widgetData = null;
    let hasData = false;

    if (newWidget.type !== 'text') {
      widgetData = generateSampleData(newWidget.type);
      hasData = true;
    }

    const newWidgetData = {
      id: `w${Date.now()}`,
      name: newWidget.name,
      type: newWidget.type || 'text',
      text: newWidget.text || 'No data available',
      data: widgetData,
      noData: !hasData && newWidget.type !== 'text'
    };

    // Add stats for donut charts
    if (newWidget.type === 'donut' && widgetData) {
      const total = widgetData.reduce((sum, item) => sum + item.value, 0);
      newWidgetData.stats = { total };
    }

    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === selectedCategory
          ? { ...cat, widgets: [...cat.widgets, newWidgetData] }
          : cat
      )
    }));

    setNewWidget({ name: '', text: '', type: 'text' });
    setShowAddWidget(false);
    setSelectedCategory('');
  };

  // Remove widget function
  const handleRemoveWidget = (categoryId, widgetId) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(cat => 
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) }
          : cat
      )
    }));
  };

  // Toggle widget in manage widgets modal
  const handleToggleWidget = (categoryId, widgetId, isChecked) => {
    if (isChecked) {
      alert('Widget added back to dashboard');
    } else {
      handleRemoveWidget(categoryId, widgetId);
    }
  };

  // Filter widgets based on search - Fixed search functionality
  const filteredCategories = dashboardData.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    category.widgets.length > 0 || searchTerm === ''
  );

  // Reset dashboard
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the dashboard to default?')) {
      setDashboardData(initialDashboardData);
      setSearchTerm('');
    }
  };

  // Render chart based on type
  const renderChart = (widget) => {
    if (widget.type === 'text') {
      return (
        <div className="p-4 text-center text-gray-500">
          <p>{widget.text || 'No data available'}</p>
        </div>
      );
    }

    if (widget.noData || !widget.data) {
      return (
        <div className="flex items-center justify-center h-48 text-gray-400">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No Graph data available!</p>
          </div>
        </div>
      );
    }

    switch (widget.type) {
      case 'donut':
        return (
          <div className="flex items-center justify-between p-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={widget.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {widget.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 pl-4">
              <div className="space-y-2">
                {widget.data.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded`} style={{ backgroundColor: item.color || '#8884d8' }}></div>
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey={widget.data[0]?.alerts !== undefined ? "alerts" : "value"} fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={widget.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="critical" stroke="#EF4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="high" stroke="#F59E0B" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="medium" stroke="#3B82F6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="low" stroke="#10B981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <div className="p-4 text-center text-gray-500">
            <p>{widget.text || 'No data available'}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#E8F4FD]">
      {/* Top Navigation */}
      <div className="bg-white border-b">
        <div className="px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h1 className="text-sm text-gray-600">Home &gt; <span className="font-semibold text-[#1B4B7C]">Dashboard V2</span></h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search widgets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-md w-64 focus:outline-none focus:border-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-[#1B4B7C]">CNAPP Dashboard</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddWidget(true)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition flex items-center gap-2"
              >
                Add Widget <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowManageWidgets(true)}
                className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                title="Manage Widgets"
              >
                <Settings className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                title="Reset Dashboard"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg">
                <Clock className="w-4 h-4 text-[#1B4B7C]" />
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border-none outline-none bg-transparent text-[#1B4B7C] cursor-pointer"
                >
                  <option>Last 2 days</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        {searchTerm && filteredCategories.every(cat => cat.widgets.length === 0) ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No widgets found matching "{searchTerm}"</p>
          </div>
        ) : (
          filteredCategories.map(category => (
            <div key={category.id} className="mb-6">
              <h2 className="text-base font-semibold text-[#1B4B7C] mb-3">{category.name}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {category.widgets.map(widget => (
                  <div key={widget.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-4 border-b flex justify-between items-center">
                      <h3 className="font-medium text-[#1B4B7C] text-sm">{widget.name}</h3>
                      <button
                        onClick={() => handleRemoveWidget(category.id, widget.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                        title="Remove Widget"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-2">
                      {renderChart(widget)}
                    </div>
                  </div>
                ))}
                
                {/* Add Widget Card - Only show when not searching or when category has widgets */}
                {(!searchTerm || category.widgets.length > 0) && (
                  <div 
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowAddWidget(true);
                    }}
                    className="bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-[#1B4B7C] transition cursor-pointer flex items-center justify-center min-h-[280px] group"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-100 group-hover:bg-[#E8F4FD] rounded-lg flex items-center justify-center mx-auto mb-2 transition">
                        <Plus className="w-6 h-6 text-gray-400 group-hover:text-[#1B4B7C]" />
                      </div>
                      <span className="text-gray-500 group-hover:text-[#1B4B7C] text-sm">Add Widget</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Widget Modal */}
      {showAddWidget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center bg-[#1B4B7C] text-white">
              <h2 className="text-lg font-semibold">Add Widget</h2>
              <button
                onClick={() => {
                  setShowAddWidget(false);
                  setSelectedCategory('');
                  setNewWidget({ name: '', text: '', type: 'text' });
                }}
                className="hover:bg-white/20 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personalize your dashboard by adding the following widget
                </label>
                <div className="flex gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4B7C]"
                  >
                    <option value="">Select Category...</option>
                    {dashboardData.categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3 text-[#1B4B7C]">Create Custom Widget</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newWidget.name}
                    onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4B7C]"
                    placeholder="Widget Name"
                  />
                  <select
                    value={newWidget.type}
                    onChange={(e) => setNewWidget({ ...newWidget, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4B7C]"
                  >
                    <option value="text">Text Widget</option>
                    <option value="donut">Donut Chart</option>
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                  </select>
                  {newWidget.type === 'text' && (
                    <textarea
                      value={newWidget.text}
                      onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1B4B7C]"
                      placeholder="Widget Text (optional)"
                      rows="3"
                    />
                  )}
                  {newWidget.type !== 'text' && (
                    <p className="text-sm text-gray-500 italic">
                      Sample data will be generated for this chart type
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowAddWidget(false);
                    setSelectedCategory('');
                    setNewWidget({ name: '', text: '', type: 'text' });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddWidget}
                  className="flex-1 px-4 py-2 bg-[#1B4B7C] text-white rounded-md hover:bg-[#143A5F]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Widgets Modal */}
      {showManageWidgets && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center bg-[#1B4B7C] text-white">
              <h2 className="text-lg font-semibold">Manage Widgets</h2>
              <button
                onClick={() => setShowManageWidgets(false)}
                className="hover:bg-white/20 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">Personalize your dashboard by selecting widgets</p>
              
              {dashboardData.categories.map(category => (
                <div key={category.id} className="mb-6">
                  <h3 className="font-semibold text-[#1B4B7C] mb-3">{category.name}</h3>
                  <div className="space-y-2 pl-4">
                    {category.widgets.length > 0 ? (
                      category.widgets.map(widget => (
                        <label key={widget.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                          <input
                            type="checkbox"
                            defaultChecked={true}
                            onChange={(e) => handleToggleWidget(category.id, widget.id, e.target.checked)}
                            className="w-4 h-4 text-[#1B4B7C] rounded focus:ring-[#1B4B7C]"
                          />
                          <span className="text-sm text-gray-700">{widget.name}</span>
                        </label>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400 italic">No widgets in this category</p>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowManageWidgets(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowManageWidgets(false)}
                  className="flex-1 px-4 py-2 bg-[#1B4B7C] text-white rounded-md hover:bg-[#143A5F]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;