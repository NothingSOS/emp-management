import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tab, Grid, Button } from 'semantic-ui-react';

const panes = ({ masterTable,
  onAddAssetTypeClick,
  onDeleteAssetTypeClick,
  onAddAssetClick,
  onDeleteAssetClick,
  onAddCertificateClick,
  onDeleteCertificateClick,
  onAddContractClick,
  onDeleteContractClick,
  onAddDegreeClick,
  onAddDepartmentClick,
  onAddFacultyClick,
  onAddLevelClick,
  onAddMajorClick,
  onAddPositionClick,
  onAddUniversityClick, }) => [
  { menuItem: 'Asset Type',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddAssetTypeClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.assetTypes.map(assetType => (
              <Table.Row key={`${assetType.id}`}>
                <Table.Cell>{`${assetType.name}`}</Table.Cell>
                <Table.Cell>{assetType.description || '-'}</Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => onDeleteAssetTypeClick(assetType.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>
    )
  },
  { menuItem: 'Asset',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddAssetClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
              <Table.HeaderCell>Own Flag</Table.HeaderCell>
              <Table.HeaderCell >Serial Number</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.assets.map(asset => (
              <Table.Row key={`${asset.id}`}>
                <Table.Cell>{`${asset.name}`}</Table.Cell>
                <Table.Cell>{`${asset.assetTypeName}`}</Table.Cell>
                <Table.Cell colSpan="3">{asset.description || '-'}</Table.Cell>
                <Table.Cell>{`${asset.ownFlag}`}</Table.Cell>
                <Table.Cell>{`${asset.serialNumber}`}</Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => onDeleteAssetClick(asset.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>
    )
  },
  { menuItem: 'Certificate',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddCertificateClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">Institute</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.certificates.map(certificate => (
              <Table.Row key={`${certificate.id}`}>
                <Table.Cell>{`${certificate.name}`}</Table.Cell>
                <Table.Cell colSpan="2">{certificate.institute}</Table.Cell>
                <Table.Cell colSpan="3">{certificate.description || '-'}</Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => onDeleteCertificateClick(certificate.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>

    )
  },
  { menuItem: 'Contract',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddContractClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.contracts.map(contract => (
              <Table.Row key={`${contract.id}`}>
                <Table.Cell>{`${contract.name}`}</Table.Cell>
                <Table.Cell colSpan="3">{contract.description || '-'}</Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => onDeleteContractClick(contract.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>
    )
  },
  { menuItem: 'Degree',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddDegreeClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.degrees.map(degree => (
              <Table.Row key={`${degree.id}`}>
                <Table.Cell>{`${degree.name}`}</Table.Cell>
                <Table.Cell colSpan="3">{degree.description || '-'}</Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>
    )
  },
  { menuItem: 'Department',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddDepartmentClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.departments.map(department => (
              <Table.Row key={`${department.id}`}>
                <Table.Cell>{`${department.name}`}</Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>
    )
  },
  { menuItem: 'Faculty',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddFacultyClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">University</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.faculties.map(faculty => (
              <Table.Row key={`${faculty.id}`}>
                <Table.Cell>{`${faculty.name}`}</Table.Cell>
                <Table.Cell colSpan="2">{`${faculty.universityName}`}</Table.Cell>
                <Table.Cell colSpan="3">{faculty.description || '-'}</Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>
    )
  },
  { menuItem: 'Level',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddLevelClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
              <Table.HeaderCell>Annual Leave</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.levels.map(level => (
              <Table.Row key={`${level.id}`}>
                <Table.Cell>{`${level.name}`}</Table.Cell>
                <Table.Cell colSpan="3">{level.description || '-'}</Table.Cell>
                <Table.Cell>{`${level.annualLeave}`}</Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>
    )
  },
  { menuItem: 'Major',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddMajorClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Faculty</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">University</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.majors.map(major => (
              <Table.Row key={`${major.id}`}>
                <Table.Cell>{`${major.name}`}</Table.Cell>
                <Table.Cell>{`${major.facultyName}`}</Table.Cell>
                <Table.Cell colSpan="2">{major.universityName}</Table.Cell>
                <Table.Cell colSpan="3">{major.description || '-'}</Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>
    )
  },
  { menuItem: 'Position',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddPositionClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.positions.map(position => (
              <Table.Row key={`${position.id}`}>
                <Table.Cell>{`${position.name}`}</Table.Cell>
                <Table.Cell colSpan="3">{position.description || '-'}</Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>
    )
  },
  { menuItem: 'University',
    render: () => (
      <div>
        <Grid.Column floated="right" width={3}>
          <Button onClick={onAddUniversityClick}>Add</Button>
        </Grid.Column>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {masterTable.universities.map(university => (
              <Table.Row key={`${university.id}`}>
                <Table.Cell>{`${university.name}`}</Table.Cell>
                <Table.Cell colSpan="3">{university.description || '-'}</Table.Cell>
              </Table.Row>
      ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
];

const MasterTable = ({ masterTable,
  onAddAssetTypeClick,
  onDeleteAssetTypeClick,
  onAddAssetClick,
  onDeleteAssetClick,
  onAddCertificateClick,
  onDeleteCertificateClick,
  onAddContractClick,
  onDeleteContractClick,
  onAddDegreeClick,
  onAddDepartmentClick,
  onAddFacultyClick,
  onAddLevelClick,
  onAddMajorClick,
  onAddPositionClick,
  onAddUniversityClick }) => (
    <div>
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={panes({ masterTable,
          onAddAssetTypeClick,
          onDeleteAssetTypeClick,
          onAddAssetClick,
          onDeleteAssetClick,
          onAddCertificateClick,
          onDeleteCertificateClick,
          onAddContractClick,
          onDeleteContractClick,
          onAddDegreeClick,
          onAddDepartmentClick,
          onAddFacultyClick,
          onAddLevelClick,
          onAddMajorClick,
          onAddPositionClick,
          onAddUniversityClick })}
      />
    </div>
);

MasterTable.propTypes = {
  masterTable: PropTypes.object.isRequired,
  onAddAssetTypeClick: PropTypes.func.isRequired,
  onDeleteAssetTypeClick: PropTypes.func.isRequired,
  onAddAssetClick: PropTypes.func.isRequired,
  onDeleteAssetClick: PropTypes.func.isRequired,
  onAddCertificateClick: PropTypes.func.isRequired,
  onDeleteCertificateClick: PropTypes.func.isRequired,
  onAddContractClick: PropTypes.func.isRequired,
  onDeleteContractClick: PropTypes.func.isRequired,
  onAddDegreeClick: PropTypes.func.isRequired,
  onAddDepartmentClick: PropTypes.func.isRequired,
  onAddFacultyClick: PropTypes.func.isRequired,
  onAddLevelClick: PropTypes.func.isRequired,
  onAddMajorClick: PropTypes.func.isRequired,
  onAddPositionClick: PropTypes.func.isRequired,
  onAddUniversityClick: PropTypes.func.isRequired
};

export default MasterTable;
