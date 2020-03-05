import React, { Component,Fragment } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import * as moment from 'moment'
import { uniqBy } from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { getCheapFlights,getBuisnessFlights } from '../../actions';

import * as Yup from 'yup';


import { showLoader } from '../../actions/ui';

let allflightdetails=[]
  let availableplaces=[];
 

  



class Home extends Component {
  constructor(props) {
    super(props);
    
    
    this.state={
      departureflights:[],
      returnflights:[],
      nodata:false
    }
  }
componentDidMount()
{
  
  
  this.props.getCheapFlights();
  this.props.getBuisnessFlights();
}
  
  allflights()
  {allflightdetails=[];
    this.props.cheapflights.map(flights=>{
      let arrivalanddeparture=flights.route.split('-')
      
      allflightdetails.push({arrival:arrivalanddeparture[1],
       departure:arrivalanddeparture[0],
       class:'Cheap',
       arrivalTime:moment(parseInt(flights.arrival)*1000).format('DD-MM-YYYY, h:mm '),
       departureTime:moment(parseInt(flights.arrival)*1000).format('DD-MM-YYYY, h:mm ')
   
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
          arrivalTime:moment(parseInt(flightsdetails.arrivalTime)*1000).format('DD-MM-YYYY, h:mm'),
          departureTime:moment(parseInt(flightsdetails.departureTime)*1000).format('DD-MM-YYYY, h:mm')
           
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
  {this.setState({departureflights:[]});
  this.setState({returnflights:[]})
  let flightsavailabledeparture=[];
  let flightsavailablereturn=[];
if(values.class=='All')
{
  flightsavailabledeparture=allflightdetails.filter(flights=>flights.arrival==values.to 
    && flights.departure==values.from
     )
     flightsavailablereturn=allflightdetails.filter(flights=>flights.arrival==values.from
      && flights.departure==values.to
       )
     
  this.setState({ departureflights:flightsavailabledeparture})
  this.setState({returnflights:flightsavailablereturn})
  
  if(flightsavailabledeparture.length===0)
  {
    this.setState({nodata:true})
  }
  else if(flightsavailablereturn.length===0)
  {
    this.setState({nodata:true})
  }
  else
  {
    this.setState({nodata:false})
  }
}
else
{
  flightsavailabledeparture=allflightdetails.filter(flights=>flights.arrival==values.to
    && flights.departure==values.from
     && flights.class==values.class)
     flightsavailablereturn=allflightdetails.filter(flights=>flights.arrival==values.from
      && flights.departure==values.to && flights.class==values.class
       )
  
     this.setState({ departureflights:flightsavailabledeparture})
     this.setState({returnflights:flightsavailablereturn})
     if(flightsavailabledeparture.length===0)
  {
    this.setState({nodata:true})
  }
  else if(flightsavailablereturn.length===0)
  {
    this.setState({nodata:true})
  }
  else
  {
    this.setState({nodata:false})
  }
}
    
  }

  render() {
   
    if(this.props.cheapflights && this.props.businessflights)
    {
      this.allflights();
      
    return (
      
      <div className="container" >
        <Formik
            initialValues={{
              '#': '',
              from:'',
              to:'',
              class:'All'
            }}
            validationSchema={Yup.object().shape({
              from: Yup.string()
                  .required('From Location is required'),
              to: Yup.string()
                  .required('To Location is required'),
            
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
                         <option value='' disabled={true} key='null' > </option>
                      {availableplaces.map((value,index) => {
                        return <option value={value.places} key={index+1}>{value.places}</option>;
                      })}
                       
                        </Field>
                        {errors.from && touched.from  ? (
                      <div className='error-txt'>Required</div>
                    ) : null}
    </div>
    <div className="col-sm">
    <label className='label-profile' htmlFor='lastName'>
                     To
                      <span className='asterix'>&nbsp;&#42;</span>
                    </label>
                        <Field component='select'
                      name='to'
                      className='form-control'>
                         <option value='' disabled={true} key='0'> </option>
                      {availableplaces.map((value,index) => {
                        return <option value={value.places} key={index+1}>{value.places}</option>;
                      })}
                        </Field>
                        {errors.to && touched.to  ? (
                      <div className='error-txt'>Required</div>
                    ) : null}
    </div>
    <div className="col-sm">
    <label className='label-profile' htmlFor='lastName'>
                     Class
                      <span className='asterix'>&nbsp;&#42;</span>
                    </label>
                        <Field component='select'
                      name='class'
                      className='form-control'>
                       
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
       
      { this.state.departureflights.length>0 && (<div style={{ maxWidth: '100%',marginTop:'20px' }}> <MaterialTable
        
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
        title="Departure Flight Details"
        data={this.state.departureflights}        
        
      />
      </div>)}
      { this.state.nodata==true && this.state.departureflights.length==0 &&(<div style={{ maxWidth: '100%',marginTop:'20px' }}> <MaterialTable
        
        columns={[
          { title: 'From', field: 'arrival' },
          { title: 'To', field: 'departure' },
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
        title="Departure Flight Details"
               />
      </div>)}
      
      { this.state.returnflights.length>0 && (<div style={{ maxWidth: '100%',marginTop:'20px' }}> <MaterialTable
        
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
        title="Return Flight Details"
        data={this.state.returnflights}        
        
      />
      </div>)}
      { this.state.nodata==true && this.state.returnflights.length==0 && (<div style={{ maxWidth: '100%',marginTop:'20px' }}> <MaterialTable
        
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
        title="Return Flight Details"
               />
      </div>)}
      </div>
    );
    
      }
      else
      {
        return( <div></div>)
      }
  }
}

const mapStateToProps = state => ({
 cheapflights:state.flightReducer.cheapflights,
 businessflights:state.flightReducer.businessflights,
 showLoader:state.uiReducer.showLoader
});

const mapDispatchToProps = dispatch => ({
  getCheapFlights: () => dispatch(getCheapFlights()),
  getBuisnessFlights:() =>dispatch(getBuisnessFlights()),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
