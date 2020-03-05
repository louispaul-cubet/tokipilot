import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { uniqBy } from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {showLoader,hideLoader} from '../../actions/ui'
import { getCheapFlights,getBuisnessFlights } from '../../actions';

import * as Yup from 'yup';
import styles from './styles';
import { Loader } from 'semantic-ui-react';
let allflightdetails=[]
  let availableplaces=[];
 
  // Data for the table to display; can be anything
  

// Fields to show in the table, and what object properties in the data they bind to
const fields = [
    { name: 'departure', displayName: "From", inputFilterable: true, sortable: true },
    { name: 'arrival', displayName: "To", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'departureTime', displayName: "Departure Time", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'arrivalTime', displayName: "Arrival Time", inputFilterable: true, exactFilterable: true, sortable: true },
    { name: 'class', displayName: "Class", inputFilterable: true, exactFilterable: true, sortable: true }
];
class Home extends Component {
  constructor(props) {
    super(props);
    
    this.props.getCheapFlights();
  this.props.getBuisnessFlights();
    this.state={
      flights:[],
      
    }
  }
componentDidMount()
{
  
  this.props.showLoader();
 
}
  
  allflights()
  {allflightdetails=[];
    this.props.cheapflights.map(flights=>{
      let arrivalanddeparture=flights.route.split('-')
      allflightdetails.push({arrival:arrivalanddeparture[0],
       departure:arrivalanddeparture[1],
       class:'Cheap',
       arrivalTime:flights.arrival,
       departureTime:flights.departure
   
     }
        
      )
      availableplaces.push({places:arrivalanddeparture[0]})
      availableplaces.push({places:arrivalanddeparture[1]})
     
     })
     this.props.businessflights.map(flightsdetails=>{
       allflightdetails.push(
         {
          arrival:flightsdetails.arrival,
          departure:flightsdetails.departure,
          class:'Business',
          arrivalTime:flightsdetails.arrivalTime,
          departureTime:flightsdetails.departureTime
           
         }
       )
       availableplaces.push({places:flightsdetails.arrival});
       availableplaces.push({places:flightsdetails.departure});
     
       

     })
     availableplaces=uniqBy(availableplaces, function (e) {
      return e.places;
    });
  
  }
  search(values)
  {this.setState({flights:[]});
  let flightsavailable=[];
  console.log(values.class);
if(values.class=='All')
{console.log(values);
  flightsavailable=allflightdetails.filter(flights=>flights.arrival==values.from 
    && flights.departure==values.to
     )
     console.log(flightsavailable);
  this.setState({flights:flightsavailable})
}
else
{
  flightsavailable=allflightdetails.filter(flights=>flights.arrival==values.from 
    && flights.departure==values.to
     && flights.class==values.class)
     console.log(flightsavailable);
  this.setState({flights:flightsavailable})
}
    
  }

  render() {
   
    if(this.props.cheapflights && this.props.businessflights)
    {
      this.allflights();
      this.props.hideLoader();
    return (
      
      <div className="container" >
        <Formik
            initialValues={{
              '#': '',
              from:'',
              to:'',
              class:''
            }}
            validationSchema={Yup.object().shape({
              from: Yup.string()
                  .required('From Location is required'),
              to: Yup.string()
                  .required('To Location is required'),
             class:Yup.string()
                  .required('Class is required')
                })}

            onSubmit={values => {
              this.search(values);
            }}
          
          render=  {({ errors, touched }) => (
              <Form>
                <div className="container">
  <div className="row">
    <div className="col-sm">
     
    <label className='label-profile' htmlFor='lastName'>
                     From
                      <span className='asterix'>&nbsp;&#42;</span>
                    </label>
                 <Field component='select'
                      name='from'
                      className='form-control'>
                         <option value='' disabled={true}> </option>
                      {availableplaces.map(value => {
                        return <option value={value.places}>{value.places}</option>;
                      })}
                       
                        </Field>
    </div>
    <div className="col-sm">
    <label className='label-profile' htmlFor='lastName'>
                     To
                      <span className='asterix'>&nbsp;&#42;</span>
                    </label>
                        <Field component='select'
                      name='to'
                      className='form-control'>
                         <option value='' disabled={true}> </option>
                      {availableplaces.map(value => {
                        return <option value={value.places}>{value.places}</option>;
                      })}
                        </Field>
    </div>
    <div className="col-sm">
    <label className='label-profile' htmlFor='lastName'>
                     Class
                      <span className='asterix'>&nbsp;&#42;</span>
                    </label>
                        <Field component='select'
                      name='class'
                      className='form-control'>
                        <option value='' disabled={true}> </option>
                        <option value='All'>All</option>
                       <option value='Cheap'>Cheap</option>
                       <option value='Business'>Business</option>
                        </Field>
    </div>
    <div className="col-sm" >
    
      <button
                    type='submit'
                    className='form-control-button btn cur-p btn-success '
                   
                   
                  >
                    Search
                  </button>
      
   
    </div>
  </div>
</div>
                
              </Form>
            )}
            
            />
       
      { this.state.flights.length>0 && (<div style={{ maxWidth: '100%' }}> <MaterialTable
        
        columns={[
          { title: 'From', field: 'departure' },
          { title: 'To', field: 'arrival' },
          { title: 'Departure Time', field: 'departureTime' },
          {
            title: 'Arrival Time',
            field: 'arrivalTime',
           
          },
          {
            title: 'Class',
            field: 'class',
           
          }
        ]}
        title="Flight Details"
        data={this.state.flights}        
        
      />
      </div>)}
        
        
      </div>
    );
      }
      else
      {
        return(<div></div>)
      }
  }
}

const mapStateToProps = state => ({
 cheapflights:state.flightReducer.cheapflights,
 businessflights:state.flightReducer.businessflights
});

const mapDispatchToProps = dispatch => ({
  getCheapFlights: () => dispatch(getCheapFlights()),
  getBuisnessFlights:() =>dispatch(getBuisnessFlights()),
  showLoader:() =>dispatch(showLoader()),
  hideLoader:()=>dispatch(hideLoader())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
