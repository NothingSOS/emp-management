import * as actionTypes from '../constants/actionTypes';

export const fetchMasterTableRequest = () => ({
  type: actionTypes.MASTER_TABLE_FETCH_REQUEST
});

export const fetchMasterTableSucesss = masterTable => ({
  type: actionTypes.MASTER_TABLE_FETCH_SUCCESS,
  payload: {
    masterTable
  }
});

export const fetchMasterTableFailure = message => ({
  type: actionTypes.MASTER_TABLE_FETCH_FAILURE,
  payload: {
    message
  }
});

// Asset Type

export const createAssetTypeRequest = (form, resolve, reject) => ({
  type: actionTypes.ASSET_TYPE_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createAssetTypeSuccess = assetType => ({
  type: actionTypes.ASSET_TYPE_CREATE_SUCCESS,
  payload: {
    assetType
  }
});

export const createAssetTypeFailure = message => ({
  type: actionTypes.ASSET_TYPE_CREATE_FAILURE,
  payload: {
    message
  }
});

export const deleteAssetTypeRequest = id => ({
  type: actionTypes.ASSET_TYPE_DELETE_REQUEST,
  payload: {
    id
  }
});

export const deleteAssetTypeSuccess = assetTypes => ({
  type: actionTypes.ASSET_TYPE_DELETE_SUCCESS,
  payload: {
    assetTypes
  }
});

export const deleteAssetTypeFailure = message => ({
  type: actionTypes.ASSET_TYPE_DELETE_FAILURE,
  payload: {
    message
  }
});

// Asset

export const createAssetRequest = (form, resolve, reject) => ({
  type: actionTypes.ASSET_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createAssetSuccess = asset => ({
  type: actionTypes.ASSET_CREATE_SUCCESS,
  payload: {
    asset
  }
});

export const createAssetFailure = message => ({
  type: actionTypes.ASSET_CREATE_FAILURE,
  payload: {
    message
  }
});

export const deleteAssetRequest = id => ({
  type: actionTypes.ASSET_DELETE_REQUEST,
  payload: {
    id
  }
});

export const deleteAssetSuccess = assets => ({
  type: actionTypes.ASSET_DELETE_SUCCESS,
  payload: {
    assets
  }
});

export const deleteAssetFailure = message => ({
  type: actionTypes.ASSET_DELETE_FAILURE,
  payload: {
    message
  }
});

// Certificate

export const createCertificateRequest = (form, resolve, reject) => ({
  type: actionTypes.CERTIFICATE_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createCertificateSuccess = certificate => ({
  type: actionTypes.CERTIFICATE_CREATE_SUCCCESS,
  payload: {
    certificate
  }
});

export const createCertificateFailure = message => ({
  type: actionTypes.CERTIFICATE_CREATE_FAILURE,
  payload: {
    message
  }
});

export const deleteCertificateRequest = id => ({
  type: actionTypes.CERTIFICATE_DELETE_REQUEST,
  payload: {
    id
  }
});

export const deleteCertificateSuccess = certificates => ({
  type: actionTypes.CERTIFICATE_DELETE_SUCCESS,
  payload: {
    certificates
  }
});

export const deleteCertificateFailure = message => ({
  type: actionTypes.CERTIFICATE_DELETE_FAILURE,
  payload: {
    message
  }
});

// Contract

export const createContractRequest = (form, resolve, reject) => ({
  type: actionTypes.CONTRACT_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createContractSuccess = contract => ({
  type: actionTypes.CONTRACT_CREATE_SUCCESS,
  payload: {
    contract
  }
});

export const createContractFailure = message => ({
  type: actionTypes.CONTRACT_CREATE_FAILURE,
  payload: {
    message
  }
});

export const deleteContractRequest = id => ({
  type: actionTypes.CONTRACT_DELETE_REQUEST,
  payload: {
    id
  }
});

export const deleteContractSuccess = contracts => ({
  type: actionTypes.CONTRACT_DELETE_SUCCESS,
  payload: {
    contracts
  }
});

export const deleteContractFailure = message => ({
  type: actionTypes.CONTRACT_DELETE_FAILURE,
  payload: {
    message
  }
});

// Degree

export const createDegreeRequest = (form, resolve, reject) => ({
  type: actionTypes.DEGREE_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createDegreeSuccess = degree => ({
  type: actionTypes.DEGREE_CREATE_SUCCESS,
  payload: {
    degree
  }
});

export const createDegreeFailure = message => ({
  type: actionTypes.DEGREE_CREATE_FAILURE,
  payload: {
    message
  }
});

// Department

export const createDepartmentRequest = (form, resolve, reject) => ({
  type: actionTypes.DEPARTMENT_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createDepartmentSuccess = department => ({
  type: actionTypes.DEPARTMENT_CREATE_SUCCESS,
  payload: {
    department
  }
});

export const createDepartmentFailure = message => ({
  type: actionTypes.DEPARTMENT_CREATE_FAILURE,
  payload: {
    message
  }
});

// Faculty

export const createFacultyRequest = (form, resolve, reject) => ({
  type: actionTypes.FACULTY_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createFacultySuccess = faculty => ({
  type: actionTypes.FACULTY_CREATE_SUCCESS,
  payload: {
    faculty
  }
});

export const createFacultyFailure = message => ({
  type: actionTypes.FACULTY_CREATE_FAILURE,
  payload: {
    message
  }
});

// Level

export const createLevelRequest = (form, resolve, reject) => ({
  type: actionTypes.LEVEL_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createLevelSuccess = level => ({
  type: actionTypes.LEVEL_CREATE_SUCCESS,
  payload: {
    level
  }
});

export const createLevelFailure = message => ({
  type: actionTypes.LEVEL_CREATE_FAILURE,
  payload: {
    message
  }
});

// Major
export const createMajorRequest = (form, resolve, reject) => ({
  type: actionTypes.MAJOR_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createMajorSuccess = major => ({
  type: actionTypes.MAJOR_CREATE_SUCCESS,
  payload: {
    major
  }
});

export const createMajorFailure = message => ({
  type: actionTypes.MAJOR_CREATE_FAILURE,
  payload: {
    message
  }
});

// Position

export const createPositionRequest = (form, resolve, reject) => ({
  type: actionTypes.POSITION_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createPositionSuccess = position => ({
  type: actionTypes.POSITION_CREATE_SUCCESS,
  payload: {
    position
  }
});

export const createPositionFailure = message => ({
  type: actionTypes.POSITION_CREATE_FAILURE,
  payload: {
    message
  }
});

// University

export const createUniversityRequest = (form, resolve, reject) => ({
  type: actionTypes.UNIVERSITY_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});

export const createUniversitySuccess = university => ({
  type: actionTypes.UNIVERSITY_CREATE_SUCCESS,
  payload: {
    university
  }
});

export const createUniversityFailure = message => ({
  type: actionTypes.UNIVERSITY_CREATE_FAILURE,
  payload: {
    message
  }
});
