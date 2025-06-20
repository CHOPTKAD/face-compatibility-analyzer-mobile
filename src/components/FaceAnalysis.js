import React from 'react';
import { Box, Typography } from '@mui/material';

const FaceAnalysis = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Analysis Results
      </Typography>
      <Typography>
        Compatibility Score: {analysis.score}%
      </Typography>
      {analysis.features && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Key Features:
          </Typography>
          <ul>
            {Object.entries(analysis.features).map(([feature, value]) => (
              <li key={feature}>
                <Typography>
                  {feature}: {value}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default FaceAnalysis; 