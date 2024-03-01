import { Button, Group, Text, rem, useMantineTheme } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconCloudUpload, IconDownload, IconX } from '@tabler/icons-react';
import { useRef } from 'react';
import classes from './DropzoneArea.module.css';

interface DropzoneAreaProps {
  acceptedTypes: string[];
  maxSize: number;
  acceptText: string;
  rejectText: string;
  idleText: string;
  text: string;
  buttonText: string;
  onDrop: () => void;
}

const DropzoneArea = ({
  acceptedTypes,
  maxSize,
  acceptText,
  rejectText,
  idleText,
  text,
  buttonText,
  onDrop,
}: DropzoneAreaProps) => {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={onDrop}
        className={classes.dropzone}
        radius="md"
        accept={acceptedTypes}
        maxSize={maxSize}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>{acceptText}</Dropzone.Accept>
            <Dropzone.Reject>{rejectText}</Dropzone.Reject>
            <Dropzone.Idle>{idleText}</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            {text}
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        {buttonText}
      </Button>
    </div>
  );
};

export default DropzoneArea;
