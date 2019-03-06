import React, { Component } from 'react';
import ResultCode from './ResultCode';
import SourceCodeInput from './SourceCodeInput';
import { template } from './util';


const testData = `loading: false,
statusType: 'CYCLE_CASE',
createVisible: false,
editVisible: false,
statusList: [],
CurrentEditStatus: {
  statusId: null,
  statusType: 'CYCLE_CASE',
  objectVersionNumber: null,
  statusName: null,
  description: null,
  statusColor: null,
},
EditStatusLoading: false,
CreateStatusLoading: false,`;
const defaultOptions = ['observable', 'action', 'get'];
const allOptions = ['observable', 'action', 'get'];
class App extends Component {
  state = {
    code: testData,
    options: defaultOptions,
  }

  
  analyzeSourceCode = (code, options = this.state.options) => {
    const value = `{${code}}`;
    const newValue = value
      .replace(/(\w*?):/g, (match, field) => `"${field}" :`)
      .replace(/'/g, '"')
      .replace(/,\s*?}/g, '}');
    try {
      const Fields = JSON.parse(newValue);
      const observers = [];
      const actions = [];
      const getters = [];
      Object.keys(Fields).forEach((key) => {
        const { observable, action, getter } = template(key, Fields[key]);
        if (options.includes('observable')) {
          observers.push(observable);
        }        
        if (options.includes('action')) {
          actions.push(action);
        }
        if (options.includes('get')) {
          getters.push(getter);
        }
      });
      const transformedData = [...observers, ...actions, ...getters].join('');
      return transformedData;      
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  handleChange = (e) => {
    this.setState({
      code: e.target.value,
    });
  }

  handleOptionChange=(options) => {
    const { code } = this.state;
    this.setState({
      options,
    });
    this.analyzeSourceCode(code, options);
  }

  handleClear=() => {
    this.setState({
      code: '',
    });
  }

  render() {
    const { code } = this.state;
    return (
      <div style={{ height: '100vh' }}>
        <div style={{ height: 50, lineHeight: '50px', padding: '0 15px' }}>
          State2Store
        </div>
        <div style={{ display: 'flex', height: 'calc(100% - 50px)' }}>
          <SourceCodeInput value={code} style={{ flex: 1 }} onChange={this.handleChange} />
          <ResultCode
            style={{ flex: 1 }}
            value={this.analyzeSourceCode(code)}
            defaultOptions={defaultOptions}
            allOptions={allOptions}
            onOptionChange={this.handleOptionChange}
            onClear={this.handleClear}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {

};

export default App;
