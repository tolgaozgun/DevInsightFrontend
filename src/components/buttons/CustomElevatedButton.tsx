import { Button, DefaultMantineColor } from '@mantine/core';

interface CustomElevatedButtonProps {
  text: string;
  leftIcon?: React.ReactNode | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isLoading?: boolean | undefined;
  disabled?: boolean | undefined;
  color?: DefaultMantineColor | undefined;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
  mt?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;
}
const CustomElevatedButton = ({
  text,
  leftIcon,
  onClick,
  isLoading,
  disabled,
  size,
  color,
  mt,
}: CustomElevatedButtonProps) => {
  return (
    <Button
      loading={isLoading}
      leftSection={leftIcon}
      onClick={onClick}
      size={size}
      disabled={disabled}
      mt={mt}
      color={color}
    >
      {text}
    </Button>
  );
};
export default CustomElevatedButton;
