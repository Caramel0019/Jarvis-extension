import { useState, useRef, useCallback, useEffect } from 'react';
import { FILE_LIMITS } from '@/utils/constants';

export interface AudioRecordingState {
  isRecording: boolean;
  duration: number;
  error: string | null;
  permissionGranted: boolean; 
}

export interface UseAudioRecorderReturn extends AudioRecordingState {
  startRecording: () => Promise<void>;
  stopRecording: () => void;
}

const MAX_RECORDING_TIME = FILE_LIMITS.AUDIO_MAX_DURATION
const MAX_FILE_SIZE = FILE_LIMITS.AUDIO_MAX_SIZE

export const useAudioRecorder = (
  externalIsRecording?: boolean,
  onRecordingComplete?: (audioBlob: Blob) => void,
  onError?: (error: string) => void
): UseAudioRecorderReturn => {
  const [state, setState] = useState<AudioRecordingState>({
    isRecording: false,
    duration: 0,
    error: null,
    permissionGranted: false,
  });

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const durationIntervalRef = useRef<number | null>(null);
  const maxTimeTimeoutRef = useRef<number | null>(null);

  // Clean up function
  const cleanup = useCallback(() => {
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }
    if (maxTimeTimeoutRef.current) {
      clearTimeout(maxTimeTimeoutRef.current);
      maxTimeTimeoutRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current = null;
    }
  }, []);

  // Start recording
  const startRecording = useCallback(async () => {
    try {  
      // Get media stream
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      chunksRef.current = [];

      // MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Handle data available
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });

        // Check file size
        if (audioBlob.size > MAX_FILE_SIZE) {
          const error = `Recording too large: ${(audioBlob.size / 1024 / 1024).toFixed(2)}MB`;
          console.error('error', error);
          setState(prev => ({ ...prev, error }));
          onError?.(error);
        } else {
          onRecordingComplete?.(audioBlob);
        }

        cleanup();
      };

      // Handle errors
      mediaRecorder.onerror = (event) => {
        const error = `Recording error: ${event.error?.message || 'Unknown error'}`;
        console.error('error', error);
        setState(prev => ({ ...prev, error, isRecording: false }));
        onError?.(error);
        cleanup();
      };

      // Start recording
      mediaRecorder.start();

      setState(prev => ({ 
        ...prev, 
        isRecording: true, 
        duration: 0, 
        permissionGranted: true,
        error: null 
      }));

      // Start duration tracking
      durationIntervalRef.current = setInterval(() => {
        setState(prev => ({ ...prev, duration: prev.duration + 1000 }));
      }, 1000);

      // Auto-stop after 30 seconds
      maxTimeTimeoutRef.current = setTimeout(() => {
        stopRecording();
      }, MAX_RECORDING_TIME);

    } catch (error) {
      let errorMessage = 'Failed to start recording';
      
      if (error instanceof Error) {
        if (error.message.includes('Permission denied') || error.message.includes('NotAllowed')) {
          errorMessage = 'Microphone permission denied';
        } else if (error.message.includes('NotFound')) {
          errorMessage = 'No microphone found';
        } else {
          errorMessage = error.message;
        }
      }

      console.error('error', errorMessage);
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        isRecording: false,
        permissionGranted: false 
      }));
      onError?.(errorMessage);
    }
  }, [state.duration, onRecordingComplete, onError, cleanup]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
      setState(prev => ({ ...prev, isRecording: false }));
    }
  }, [state.isRecording]);

  // Handle external isRecording prop
  useEffect(() => {
    if (externalIsRecording !== undefined) {
      if (externalIsRecording && !state.isRecording) {
        startRecording();
      } else if (!externalIsRecording && state.isRecording) {
        stopRecording();
      }
    }
  }, [externalIsRecording, state.isRecording, startRecording, stopRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    ...state,
    startRecording,
    stopRecording,
  };
};